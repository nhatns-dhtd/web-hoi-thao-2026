const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');

const app = express();

// Middleware
app.use(cors());
// Giới hạn 10mb vì ảnh admin upload được nhúng base64 vào body của PUT /api/site-content.
app.use(express.json({ limit: '10mb' }));

// Giá trị hợp lệ của các cột trạng thái bài báo. Phải trùng union ReviewStatus /
// PresentationStatus ở types.ts — giá trị lạ lọt vào DB sẽ làm badge và select trên
// trang Kết quả duyệt bài hiển thị trống.
const REVIEW_STATUSES = ['Duyệt', 'Không duyệt', 'Đang chờ duyệt'];
const PRESENTATION_STATUSES = ['Trình bày', 'Không trình bày'];

const pickReviewStatus = (value) => (REVIEW_STATUSES.includes(value) ? value : null);
const pickPresentationStatus = (value) => (PRESENTATION_STATUSES.includes(value) ? value : null);

/** Trả về 1..3 nếu hợp lệ, null nếu không gửi, undefined nếu gửi giá trị sai. */
const parseTopic = (value) => {
    if (value === undefined || value === null || value === '') return null;
    const parsed = parseInt(value, 10);
    return parsed >= 1 && parsed <= 3 ? parsed : undefined;
};

app.get('/api/test-db', async (req, res) => {
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
    try {
        const { rows } = await sql`SELECT * FROM users WHERE username = ${username};`;
        const user = rows[0];
        if (user && user.password === password) {
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error during login', details: error.message });
    }
});

app.get('/api/users', async (req, res) => {
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
app.get('/api/registrations', async (req, res) => {
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

app.post('/api/announcements', async (req, res) => {
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

app.put('/api/announcements/:id', async (req, res) => {
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

app.delete('/api/announcements/:id', async (req, res) => {
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
app.get('/api/papers', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM papers ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch papers', details: error.message });
    }
});

app.get('/api/papers/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const { rows } = await sql`SELECT * FROM papers WHERE id = ${id};`;
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Paper not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch paper', details: error.message });
    }
});

app.post('/api/papers', async (req, res) => {
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

app.put('/api/papers/:id', async (req, res) => {
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

app.delete('/api/papers/:id', async (req, res) => {
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

app.put('/api/site-content', async (req, res) => {
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