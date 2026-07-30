const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
const {
    SESSION_TTL_SECONDS,
    hashPassword,
    verifyPassword,
    createSessionToken,
    verifySessionToken,
} = require('./lib/auth');

const app = express();

const SESSION_COOKIE = 'afce_session';

// Middleware
// credentials: true để browser gửi cookie session. Không dùng origin '*' vì kèm
// credentials thì spec cấm; site và API cùng origin trên Vercel nên phản chiếu origin.
app.use(cors({ origin: true, credentials: true }));
// Giới hạn 10mb vì ảnh admin upload được nhúng base64 vào body của PUT /api/site-content.
app.use(express.json({ limit: '10mb' }));

// Giá trị hợp lệ của các cột trạng thái bài báo. Phải trùng union ReviewStatus /
// PresentationStatus ở types.ts — giá trị lạ lọt vào DB sẽ làm badge và select trên
// trang Kết quả duyệt bài hiển thị trống.
const REVIEW_STATUSES = ['Duyệt', 'Không duyệt', 'Đang chờ duyệt'];
const PRESENTATION_STATUSES = ['Trình bày', 'Không trình bày'];

// --- SESSION ---
// Tự đọc cookie từ header thay vì thêm cookie-parser: chỉ cần đúng một cookie.
const readSessionCookie = (req) => {
    const header = req.headers.cookie;
    if (!header) return null;
    for (const part of header.split(';')) {
        const [name, ...rest] = part.trim().split('=');
        if (name === SESSION_COOKIE) return decodeURIComponent(rest.join('='));
    }
    return null;
};

const buildSessionCookie = (token, maxAgeSeconds) => {
    const attributes = [
        `${SESSION_COOKIE}=${token}`,
        'Path=/',
        'HttpOnly',
        // Lax chứ không Strict: chặn được POST từ site khác (CSRF) nhưng vẫn giữ
        // đăng nhập khi admin mở link tới trang quản trị từ email.
        'SameSite=Lax',
        `Max-Age=${maxAgeSeconds}`,
    ];
    // Vercel luôn HTTPS; localhost http thì bỏ Secure để dev được.
    if (process.env.NODE_ENV === 'production') attributes.push('Secure');
    return attributes.join('; ');
};

/** Chặn mọi thao tác ghi và dữ liệu nội bộ. Không có middleware này thì API ai cũng gọi được. */
const requireAdmin = (req, res, next) => {
    const session = verifySessionToken(readSessionCookie(req));
    if (!session || session.role !== 'admin') {
        return res.status(401).json({ message: 'Cần đăng nhập bằng tài khoản admin' });
    }
    req.session = session;
    next();
};

const pickReviewStatus = (value) => (REVIEW_STATUSES.includes(value) ? value : null);
const pickPresentationStatus = (value) => (PRESENTATION_STATUSES.includes(value) ? value : null);

/** Trả về 1..3 nếu hợp lệ, null nếu không gửi, undefined nếu gửi giá trị sai. */
const parseTopic = (value) => {
    if (value === undefined || value === null || value === '') return null;
    const parsed = parseInt(value, 10);
    return parsed >= 1 && parsed <= 3 ? parsed : undefined;
};

app.get('/api/test-db', requireAdmin, async (req, res) => {
  try {
    const { rows } = await sql`SELECT NOW();`;
    res.json({ message: 'Database connected', time: rows[0].now });
  } catch (error) {
    res.status(500).json({ message: 'Database error', details: error.message });
  }
});

// --- AUTH & USERS ---
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Thiếu tên đăng nhập hoặc mật khẩu' });
    }
    try {
        const { rows } = await sql`SELECT * FROM users WHERE username = ${username};`;
        const user = rows[0];
        // Không tách riêng "sai tên" và "sai mật khẩu" để không tiết lộ user nào tồn tại.
        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        const { password: _password, ...userWithoutPassword } = user;
        res.setHeader('Set-Cookie', buildSessionCookie(createSessionToken(user), SESSION_TTL_SECONDS));
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Database error during login', details: error.message });
    }
});

app.post('/api/logout', (req, res) => {
    res.setHeader('Set-Cookie', buildSessionCookie('', 0));
    res.status(204).end();
});

/** Cho FE phục hồi phiên sau khi refresh trang. 401 nghĩa là chưa đăng nhập, không phải lỗi. */
app.get('/api/me', async (req, res) => {
    const session = verifySessionToken(readSessionCookie(req));
    if (!session) {
        return res.status(401).json({ message: 'Chưa đăng nhập' });
    }
    try {
        const { rows } = await sql`SELECT id, username, role, email FROM users WHERE id = ${session.sub};`;
        if (rows.length === 0) {
            // Tài khoản đã bị xoá sau khi token được cấp.
            res.setHeader('Set-Cookie', buildSessionCookie('', 0));
            return res.status(401).json({ message: 'Tài khoản không còn tồn tại' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Database error', details: error.message });
    }
});

app.get('/api/users', requireAdmin, async (req, res) => {
    try {
        const { rows } = await sql`SELECT id, username, role, email FROM users;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', details: error.message });
    }
});

// --- REGISTRATIONS ---
// Chỉ còn đường đọc: đăng ký tham dự giờ đi qua Google Form, không có UI nào ghi vào
// bảng này nữa. `POST /api/registrations` đã xoá vì không còn caller mà lại là endpoint
// ghi không auth. Bảng và dữ liệu cũ giữ nguyên.
// requireAdmin: bảng này chứa tên, email, số điện thoại người đăng ký.
app.get('/api/registrations', requireAdmin, async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM registrations ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch registrations', details: error.message });
    }
});

// --- ANNOUNCEMENTS ---
app.get('/api/announcements', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM announcements ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch announcements', details: error.message });
    }
});

app.post('/api/announcements', requireAdmin, async (req, res) => {
    const { title, content, imageUrl, contentImages } = req.body;
    const date = new Intl.DateTimeFormat('en-GB').format(new Date());
    try {
        const { rows } = await sql`
            INSERT INTO announcements (title, content, "imageUrl", date, "contentImages")
            VALUES (${title}, ${content}, ${imageUrl}, ${date}, ${JSON.stringify(contentImages || [])}::jsonb)
            RETURNING *;
        `;
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create announcement', details: error.message });
    }
});

app.put('/api/announcements/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, imageUrl, contentImages } = req.body; // Added contentImages to destructuring
    try {
        const { rows } = await sql`
            UPDATE announcements
            SET 
                title = COALESCE(${title}, title),
                content = COALESCE(${content}, content),
                "imageUrl" = COALESCE(${imageUrl}, "imageUrl"),
                "contentImages" = COALESCE(${contentImages ? JSON.stringify(contentImages) : null}::jsonb, "contentImages")
            WHERE id = ${id}
            RETURNING *;
        `;
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Announcement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update announcement', details: error.message });
    }
});

app.delete('/api/announcements/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await sql`DELETE FROM announcements WHERE id = ${id};`;
        if (result.rowCount > 0) {
            res.status(200).json({ id: id });
        } else {
            res.status(404).json({ message: "Announcement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete announcement', details: error.message });
    }
});

// --- PAPERS ---
// Trang Kết quả duyệt bài là công khai nên endpoint này không cần đăng nhập. Liệt kê
// cột tường minh thay vì SELECT *: bản ghi cũ còn cột "fullTextUrl" trỏ tới file Blob
// public, SELECT * sẽ đẩy link đó ra response cho mọi khách.
app.get('/api/papers', async (req, res) => {
    try {
        const { rows } = await sql`
            SELECT id, "paperCode", "authorName", organization, "paperTitle", topic,
                   "abstractStatus", "fullTextStatus", "reviewStatus", "presentationStatus"
            FROM papers ORDER BY id DESC;
        `;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch papers', details: error.message });
    }
});

app.post('/api/papers', requireAdmin, async (req, res) => {
    const {
        paperCode, authorName, organization, paperTitle, topic,
        abstractStatus, fullTextStatus, reviewStatus, presentationStatus,
    } = req.body;

    if (!authorName?.trim() || !paperTitle?.trim()) {
        return res.status(400).json({ message: 'authorName và paperTitle là bắt buộc' });
    }

    const parsedTopic = parseTopic(topic);
    if (parsedTopic === undefined) {
        return res.status(400).json({ message: `topic không hợp lệ: ${topic}. Chỉ nhận 1, 2 hoặc 3.` });
    }

    try {
        const { rows } = await sql`
            INSERT INTO papers ("paperCode", "authorName", organization, "paperTitle", topic, "abstractStatus", "fullTextStatus", "reviewStatus", "presentationStatus")
            VALUES (
                ${paperCode?.trim() || null},
                ${authorName.trim()},
                ${organization?.trim() || null},
                ${paperTitle.trim()},
                ${parsedTopic ?? 1},
                ${pickReviewStatus(abstractStatus) || 'Đang chờ duyệt'},
                ${pickReviewStatus(fullTextStatus) || 'Đang chờ duyệt'},
                ${pickReviewStatus(reviewStatus) || 'Đang chờ duyệt'},
                ${pickPresentationStatus(presentationStatus) || 'Không trình bày'}
            )
            RETURNING *;
        `;
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create paper', details: error.message });
    }
});

app.put('/api/papers/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { paperCode, authorName, organization, paperTitle, topic, abstractStatus, fullTextStatus, reviewStatus, presentationStatus } = req.body;

    // Hai cột này là NOT NULL nhưng chuỗi rỗng vẫn lọt qua, dẫn tới dòng trống trên
    // trang công khai. Không gửi thì giữ nguyên; gửi rỗng thì coi là sai.
    if (authorName !== undefined && !authorName.trim()) {
        return res.status(400).json({ message: 'authorName không được để trống' });
    }
    if (paperTitle !== undefined && !paperTitle.trim()) {
        return res.status(400).json({ message: 'paperTitle không được để trống' });
    }

    const parsedTopic = parseTopic(topic);
    if (parsedTopic === undefined) {
        return res.status(400).json({ message: `topic không hợp lệ: ${topic}. Chỉ nhận 1, 2 hoặc 3.` });
    }

    try {
         const { rows } = await sql`
            UPDATE papers
            SET
                "paperCode" = COALESCE(${paperCode ?? null}, "paperCode"),
                "authorName" = COALESCE(${authorName?.trim() ?? null}, "authorName"),
                organization = COALESCE(${organization ?? null}, organization),
                "paperTitle" = COALESCE(${paperTitle?.trim() ?? null}, "paperTitle"),
                topic = COALESCE(${parsedTopic}, topic),
                "abstractStatus" = COALESCE(${pickReviewStatus(abstractStatus)}, "abstractStatus"),
                "fullTextStatus" = COALESCE(${pickReviewStatus(fullTextStatus)}, "fullTextStatus"),
                "reviewStatus" = COALESCE(${pickReviewStatus(reviewStatus)}, "reviewStatus"),
                "presentationStatus" = COALESCE(${pickPresentationStatus(presentationStatus)}, "presentationStatus")
            WHERE id = ${id}
            RETURNING *;
        `;
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Paper not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update paper', details: error.message });
    }
});

app.delete('/api/papers/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await sql`DELETE FROM papers WHERE id = ${id};`;
        if (result.rowCount > 0) {
            res.status(200).json({ id: id });
        } else {
            res.status(404).json({ message: "Paper not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete paper', details: error.message });
    }
});

// --- SITE CONTENT ---
app.get('/api/site-content', async (req, res) => {
    try {
        const { rows } = await sql`SELECT content FROM site_content WHERE id = 1;`;
        if (rows.length > 0) {
            res.json(rows[0].content);
        } else {
            res.status(404).json({ message: "Site content not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch site content', details: error.message });
    }
});

app.put('/api/site-content', requireAdmin, async (req, res) => {
    const partialContent = req.body;
    try {
        const { rows } = await sql`
            UPDATE site_content
            SET content = content || ${JSON.stringify(partialContent)}::jsonb
            WHERE id = 1
            RETURNING content;
        `;
        if (rows.length > 0) {
            res.json(rows[0].content);
        } else {
            res.status(404).json({ message: "Site content not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update site content', details: error.message });
    }
});

app.get("/api/hello", (req, res) => {
  return res.send("Hello");
});

// Export the app for Vercel
module.exports = app;