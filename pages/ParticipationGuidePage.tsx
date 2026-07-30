import React from 'react';
import { ABSTRACT_FORM_URL, ATTEND_FORM_URL, FULL_PAPER_FORM_URL } from '../constants';
import type { Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const SUBMISSION_EMAIL = 'afce@hnmu.edu.vn';
const FULL_TEXT_DEADLINE = '20/8/2026';

// Nút mở Google Form ở tab mới. Chưa có link (xem constants.ts) thì hiện trạng thái
// "Đang cập nhật" và không bấm được, tránh dẫn tác giả tới một form sai.
const FormButton: React.FC<{ url: string; label: string; colorClass: string }> = ({ url, label, colorClass }) => {
    if (!url) {
        return (
            <span className="inline-block bg-surface-sunken text-ink-muted font-bold py-3 px-6 rounded-lg cursor-not-allowed italic">
                {label} <span className="not-italic">— Đang cập nhật</span>
            </span>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${colorClass} text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg`}
        >
            {label} <i className="fas fa-external-link-alt ml-2"></i>
        </a>
    );
};


const SectionCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <section className="bg-surface p-6 rounded-lg shadow-xl border border-line/50">
        <h2 className="text-xl sm:text-2xl md:text-3xl sm:text-xl sm:text-2xl font-bold text-brand-ink mb-6 flex items-center">
            <i className={`fas ${icon} mr-4 text-amber-600`}></i>
            {title}
        </h2>
        <div className="space-y-4 text-ink text-lg">
            {children}
        </div>
    </section>
);

const ContactCard: React.FC<{
    title: string;
    name: string;
    position?: string;
    phone: string;
    email: string;
}> = ({ title, name, position, phone, email }) => (
    <div className="bg-surface-sunken p-4 rounded-lg h-full flex flex-col border border-line">
        <h4 className="font-bold text-xl text-ink mb-2">{title}</h4>
        <div className="flex-grow">
            <p className="text-sm text-ink-soft font-semibold">{name}</p>
            {position && <p className="text-xs text-ink-muted mb-3">{position}</p>}
        </div>
        <div className="mt-2 space-y-1 text-sm text-ink">
            <p>
                <i className="fas fa-phone-alt w-5 text-center mr-2 text-ink-muted"></i>
                <a href={`tel:${phone.replace(/\./g, '')}`} className="hover:underline">{phone}</a>
            </p>
            <p>
                <i className="fas fa-envelope w-5 text-center mr-2 text-ink-muted"></i>
                <a href={`mailto:${email}`} className="hover:underline break-all">{email}</a>
            </p>
        </div>
    </div>
);


const ParticipationGuidePage: React.FC = () => {
    const { siteContent } = useSiteContent();

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-ink">Hướng dẫn Tham dự & Nộp bài</h1>
                <p className="text-ink text-xl">Tất cả thông tin bạn cần để tham gia và đóng góp cho hội thảo.</p>
            </div>

            <SectionCard title="Quy trình nộp bài" icon="fa-file-alt">
                <p>
                    Ban tổ chức kính mời các cơ quan, tổ chức, chuyên gia, nhà khoa học, giảng viên, giáo viên,
                    nghiên cứu sinh, học viên cao học và sinh viên tham gia viết bài và tham dự Diễn đàn.
                    Toàn văn báo cáo gửi <strong className="text-amber-700">trước ngày {FULL_TEXT_DEADLINE}</strong>.
                </p>
                <div className="mt-6 space-y-6">
                    {/* Bước 1: Nộp tóm tắt */}
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Bước 1: Nộp tóm tắt</h3>
                        <p className="mb-4 text-ink">
                            Gửi tóm tắt và từ khóa qua Google Form. Ban tổ chức xem xét và thông báo kết quả qua email.
                        </p>
                        <FormButton url={ABSTRACT_FORM_URL} label="Form Nộp tóm tắt" colorClass="bg-green-600 hover:bg-green-700" />
                    </div>

                    {/* Bước 2: Nộp báo cáo toàn văn */}
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Bước 2: Nộp báo cáo toàn văn</h3>
                        <p className="mb-4 text-ink">
                            Sau khi tóm tắt được chấp thuận, nộp báo cáo toàn văn qua Google Form,
                            trước ngày {FULL_TEXT_DEADLINE}. Tác giả cũng có thể gửi file mềm về email{' '}
                            <a href={`mailto:${SUBMISSION_EMAIL}`} className="text-amber-700 hover:underline">{SUBMISSION_EMAIL}</a>.
                        </p>
                        <FormButton url={FULL_PAPER_FORM_URL} label="Form Nộp toàn văn" colorClass="bg-brand hover:bg-brand-hover" />
                    </div>

                    {/* Bước 3: Đăng ký tham dự */}
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Bước 3: Đăng ký tham dự</h3>
                        <p className="mb-4 text-ink">
                            Tất cả đại biểu tham dự, bao gồm cả tác giả có báo cáo, vui lòng đăng ký qua Google Form.
                        </p>
                        <FormButton url={ATTEND_FORM_URL} label="Form Đăng ký tham dự" colorClass="bg-brand hover:bg-brand-hover" />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Kỷ yếu và quy cách trình bày bản thảo" icon="fa-book">
                <p>
                    Các báo cáo được Hội thảo chấp nhận đăng sẽ xuất bản trong
                    <strong className="text-emerald-800"> Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam</strong>.
                </p>
                <div className="mt-4 space-y-4">
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Tóm tắt và từ khóa</h3>
                        <p>
                            Ở đầu báo cáo cần có phần Tóm tắt và Từ khóa. Nếu là bài báo tiếng Việt thì có thêm
                            tên bài báo (Title), phần Tóm tắt bằng tiếng Anh (Abstract) và Keywords được dịch từ
                            phần Tóm tắt và Từ khóa tiếng Việt.
                        </p>
                    </div>
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Định dạng file</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>File MS Word, font Times New Roman, bảng mã Unicode, cỡ chữ 12.</li>
                            <li>Paper size: rộng 20 cm, cao 27 cm.</li>
                            <li>Lề: trên 3,5 cm; dưới 2,5 cm; trái 3 cm; phải 2 cm.</li>
                            <li>First line: none; khoảng cách đoạn: before 6 pt, after 0 pt; line spacing: single.</li>
                            <li>Nội dung phải có trích dẫn tài liệu trong danh mục tài liệu tham khảo; chú thích và trích dẫn theo chuẩn APA.</li>
                        </ul>
                    </div>
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Thông tin tác giả và tên file</h3>
                        <p className="mb-2">
                            Cuối báo cáo, tác giả/nhóm tác giả giới thiệu vắn tắt về bản thân: chức danh khoa học,
                            học vị, đơn vị đang công tác, công việc chính, hướng nghiên cứu chính, địa chỉ liên lạc,
                            email và số điện thoại.
                        </p>
                        <p>
                            Tên file bài báo (Tóm tắt và Toàn văn) đặt theo quy định:
                            <em className="text-amber-700"> Số hiệu Chủ đề_Họ và tên tác giả</em>.
                            Ví dụ: <code className="bg-surface px-2 py-0.5 rounded text-amber-800">ChudeA.1_NguyenVanA</code>
                        </p>
                    </div>
                    <div className="bg-surface-sunken p-4 rounded-lg border border-line">
                        <h3 className="text-xl font-semibold text-ink mb-2">Mẫu báo cáo tham dự</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Tên báo cáo</li>
                            <li>Tên tác giả (kèm chú thích địa chỉ cơ quan công tác, email và số điện thoại liên hệ)</li>
                            <li>Tóm tắt (nội dung tóm tắt bằng tiếng Việt) và Từ khóa</li>
                            <li>Nội dung của báo cáo</li>
                            <li>Tài liệu tham khảo</li>
                        </ol>
                        <p className="mt-3 text-sm text-ink-soft">
                            Tài liệu tham khảo trình bày theo dạng:
                            <em className="text-amber-700"> [1] Tên tác giả (hoặc cơ quan ban hành văn bản) (Năm xuất bản),
                            tên tài liệu tham khảo (in nghiêng), tên nhà xuất bản.</em>
                        </p>
                    </div>
                </div>
            </SectionCard>


            <SectionCard title="Lệ phí công bố, xuất bản Kỷ yếu" icon="fa-money-check-alt">
                <div className="space-y-3">
                    <p>
                        <strong className="text-amber-700 font-bold">1.500.000 VNĐ (60 USD)</strong> đối với tác giả là
                        nghiên cứu sinh, học viên cao học, sinh viên và tác giả thuộc đơn vị khác.
                    </p>
                    <p>
                        <strong className="text-emerald-700 font-bold">0 VNĐ</strong> đối với tác giả là cán bộ, giảng viên
                        Trường Đại học Thủ đô Hà Nội (nếu đứng độc lập).
                    </p>
                    <p className="text-sm text-ink-muted italic">
                        Đối với bài viết có tác giả ngoài trường tham gia, kinh phí tính theo số lượng tác giả của bài viết.
                    </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line-strong">
                    <h3 className="font-semibold text-xl text-ink mb-3">Thông tin chuyển khoản</h3>
                    <ul className="space-y-2 text-ink bg-surface-sunken p-4 rounded-md border border-line">
                        <li><strong>Tên tài khoản:</strong> Trường Đại học Thủ đô Hà Nội</li>
                        <li><strong>Số tài khoản:</strong> 1507201069189</li>
                        <li><strong>Ngân hàng:</strong> Agribank - Chi nhánh Cầu Giấy</li>
                        <li><strong>Nội dung chuyển khoản:</strong> Lệ phí tham dự HTQT AFCE 2026</li>
                    </ul>
                </div>
            </SectionCard>

            <SectionCard title="Liên lạc" icon="fa-headset">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ContactCard
                        title="Thông tin chi tiết"
                        name="TS. Đinh Thị Kim Thương"
                        position="Phòng QLKHCN-HTPT, Trường Đại học Thủ đô Hà Nội"
                        phone="0988.766.307"
                        email="dtkthuong@daihocthudo.edu.vn"
                    />
                    <div className="bg-surface-sunken p-4 rounded-lg h-full flex flex-col border border-line">
                        <h4 className="font-bold text-xl text-ink mb-2">Nộp bài</h4>
                        <div className="flex-grow">
                            <p className="text-sm text-ink-soft font-semibold">Ban tổ chức Hội thảo</p>
                            <p className="text-xs text-ink-muted mb-3">Hạn gửi toàn văn: trước ngày {FULL_TEXT_DEADLINE}</p>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-ink">
                            <p>
                                <i className="fas fa-envelope w-5 text-center mr-2 text-ink-muted"></i>
                                <a href={`mailto:${SUBMISSION_EMAIL}`} className="hover:underline break-all">{SUBMISSION_EMAIL}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </SectionCard>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                 <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-ink mb-4">Đơn vị đồng tổ chức</h2>
                    <div className="flex justify-center items-center gap-6 flex-wrap bg-surface p-4 rounded-lg border border-line/50">
                        {siteContent.coOrganizers.length === 0 ? (
                            <p className="text-ink-muted italic py-4">Đang cập nhật</p>
                        ) : siteContent.coOrganizers.map((org: Sponsor) => (
                        <div key={org.id} className="p-2">
                            <img src={org.logoUrl} alt={org.name} className="h-14 object-contain" />
                            <p className="mt-2 text-sm font-semibold text-ink">{org.name}</p>
                        </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-ink mb-4">Đơn vị tài trợ</h2>
                     <div className="flex justify-center items-center gap-6 flex-wrap bg-surface p-4 rounded-lg border border-line/50">
                        {siteContent.sponsors.length === 0 ? (
                            <p className="text-ink-muted italic py-4">Đang cập nhật</p>
                        ) : siteContent.sponsors.map((sponsor: Sponsor) => (
                        <div key={sponsor.id} className="p-2">
                            <img src={sponsor.logoUrl} alt={sponsor.name} className="h-14 object-contain" />
                             <p className="mt-2 text-sm font-semibold text-ink">{sponsor.name}</p>
                        </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    )
}

export default ParticipationGuidePage;
