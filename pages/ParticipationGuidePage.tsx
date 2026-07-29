import React from 'react';
import { Link } from 'react-router-dom';
import type { Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const SUBMISSION_EMAIL = 'afce@hnmu.edu.vn';
const FULL_TEXT_DEADLINE = '20/8/2026';


const SectionCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <section className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700/50">
        <h2 className="text-xl sm:text-2xl md:text-3xl sm:text-xl sm:text-2xl font-bold text-yellow-100 mb-6 flex items-center">
            <i className={`fas ${icon} mr-4 text-yellow-500`}></i>
            {title}
        </h2>
        <div className="space-y-4 text-slate-100 text-lg">
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
    <div className="bg-slate-900/50 p-4 rounded-lg h-full flex flex-col border border-slate-700">
        <h4 className="font-bold text-xl text-slate-100 mb-2">{title}</h4>
        <div className="flex-grow">
            <p className="text-sm text-slate-200 font-semibold">{name}</p>
            {position && <p className="text-xs text-slate-400 mb-3">{position}</p>}
        </div>
        <div className="mt-2 space-y-1 text-sm text-slate-100">
            <p>
                <i className="fas fa-phone-alt w-5 text-center mr-2 text-slate-400"></i>
                <a href={`tel:${phone.replace(/\./g, '')}`} className="hover:underline">{phone}</a>
            </p>
            <p>
                <i className="fas fa-envelope w-5 text-center mr-2 text-slate-400"></i>
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
                <h1 className="text-4xl font-bold mb-4 text-slate-100">Hướng dẫn Tham dự & Nộp bài</h1>
                <p className="text-slate-100 text-xl">Tất cả thông tin bạn cần để tham gia và đóng góp cho hội thảo.</p>
            </div>

            <SectionCard title="Quy trình nộp bài" icon="fa-file-alt">
                <p>
                    Ban tổ chức kính mời các cơ quan, tổ chức, chuyên gia, nhà khoa học, giảng viên, giáo viên,
                    nghiên cứu sinh, học viên cao học và sinh viên tham gia viết bài và tham dự Diễn đàn.
                    Toàn văn báo cáo gửi <strong className="text-amber-300">trước ngày {FULL_TEXT_DEADLINE}</strong>.
                </p>
                <div className="mt-6 space-y-6">
                    {/* Cách 1: Nộp qua website */}
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Cách 1: Nộp trực tuyến trên website</h3>
                        <p className="mb-4 text-slate-100">
                            Tải lên tệp báo cáo toàn văn và khai báo thông tin tác giả tại form nộp bài của Diễn đàn.
                        </p>
                        <Link
                            to="/submit-paper"
                            className="inline-block bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Đi đến Form Nộp Toàn văn <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>

                    {/* Cách 2: Nộp qua email */}
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Cách 2: Gửi qua email Ban tổ chức</h3>
                        <p className="mb-4 text-slate-100">
                            Gửi file mềm báo cáo toàn văn về địa chỉ email của Ban tổ chức Hội thảo.
                        </p>
                        <a
                            href={`mailto:${SUBMISSION_EMAIL}`}
                            className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            {SUBMISSION_EMAIL} <i className="fas fa-envelope ml-2"></i>
                        </a>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Kỷ yếu và quy cách trình bày bản thảo" icon="fa-book">
                <p>
                    Các báo cáo được Hội thảo chấp nhận đăng sẽ xuất bản trong
                    <strong className="text-emerald-300"> Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam</strong>.
                </p>
                <div className="mt-4 space-y-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Tóm tắt và từ khóa</h3>
                        <p>
                            Ở đầu báo cáo cần có phần Tóm tắt và Từ khóa. Nếu là bài báo tiếng Việt thì có thêm
                            tên bài báo (Title), phần Tóm tắt bằng tiếng Anh (Abstract) và Keywords được dịch từ
                            phần Tóm tắt và Từ khóa tiếng Việt.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Định dạng file</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>File MS Word, font Times New Roman, bảng mã Unicode, cỡ chữ 12.</li>
                            <li>Paper size: rộng 20 cm, cao 27 cm.</li>
                            <li>Lề: trên 3,5 cm; dưới 2,5 cm; trái 3 cm; phải 2 cm.</li>
                            <li>First line: none; khoảng cách đoạn: before 6 pt, after 0 pt; line spacing: single.</li>
                            <li>Nội dung phải có trích dẫn tài liệu trong danh mục tài liệu tham khảo; chú thích và trích dẫn theo chuẩn APA.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Thông tin tác giả và tên file</h3>
                        <p className="mb-2">
                            Cuối báo cáo, tác giả/nhóm tác giả giới thiệu vắn tắt về bản thân: chức danh khoa học,
                            học vị, đơn vị đang công tác, công việc chính, hướng nghiên cứu chính, địa chỉ liên lạc,
                            email và số điện thoại.
                        </p>
                        <p>
                            Tên file bài báo (Tóm tắt và Toàn văn) đặt theo quy định:
                            <em className="text-amber-300"> Số hiệu Chủ đề_Họ và tên tác giả</em>.
                            Ví dụ: <code className="bg-slate-800 px-2 py-0.5 rounded text-amber-200">ChudeA.1_NguyenVanA</code>
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">Mẫu báo cáo tham dự</h3>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Tên báo cáo</li>
                            <li>Tên tác giả (kèm chú thích địa chỉ cơ quan công tác, email và số điện thoại liên hệ)</li>
                            <li>Tóm tắt (nội dung tóm tắt bằng tiếng Việt) và Từ khóa</li>
                            <li>Nội dung của báo cáo</li>
                            <li>Tài liệu tham khảo</li>
                        </ol>
                        <p className="mt-3 text-sm text-slate-300">
                            Tài liệu tham khảo trình bày theo dạng:
                            <em className="text-amber-300"> [1] Tên tác giả (hoặc cơ quan ban hành văn bản) (Năm xuất bản),
                            tên tài liệu tham khảo (in nghiêng), tên nhà xuất bản.</em>
                        </p>
                    </div>
                </div>
            </SectionCard>


            <SectionCard title="Lệ phí công bố, xuất bản Kỷ yếu" icon="fa-money-check-alt">
                <div className="space-y-3">
                    <p>
                        <strong className="text-amber-400 font-bold">1.500.000 VNĐ (60 USD)</strong> đối với tác giả là
                        nghiên cứu sinh, học viên cao học, sinh viên và tác giả thuộc đơn vị khác.
                    </p>
                    <p>
                        <strong className="text-emerald-400 font-bold">0 VNĐ</strong> đối với tác giả là cán bộ, giảng viên
                        Trường Đại học Thủ đô Hà Nội (nếu đứng độc lập).
                    </p>
                    <p className="text-sm text-slate-400 italic">
                        Đối với bài viết có tác giả ngoài trường tham gia, kinh phí tính theo số lượng tác giả của bài viết.
                    </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-600">
                    <h3 className="font-semibold text-xl text-slate-100 mb-3">Thông tin chuyển khoản</h3>
                    <ul className="space-y-2 text-slate-100 bg-slate-900/50 p-4 rounded-md border border-slate-700">
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
                    <div className="bg-slate-900/50 p-4 rounded-lg h-full flex flex-col border border-slate-700">
                        <h4 className="font-bold text-xl text-slate-100 mb-2">Nộp bài</h4>
                        <div className="flex-grow">
                            <p className="text-sm text-slate-200 font-semibold">Ban tổ chức Hội thảo</p>
                            <p className="text-xs text-slate-400 mb-3">Hạn gửi toàn văn: trước ngày {FULL_TEXT_DEADLINE}</p>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-slate-100">
                            <p>
                                <i className="fas fa-envelope w-5 text-center mr-2 text-slate-400"></i>
                                <a href={`mailto:${SUBMISSION_EMAIL}`} className="hover:underline break-all">{SUBMISSION_EMAIL}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </SectionCard>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                 <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-yellow-100 mb-4">Đơn vị đồng tổ chức</h2>
                    <div className="flex justify-center items-center gap-6 flex-wrap bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                        {siteContent.coOrganizers.length === 0 ? (
                            <p className="text-slate-400 italic py-4">Đang cập nhật</p>
                        ) : siteContent.coOrganizers.map((org: Sponsor) => (
                        <div key={org.id} className="p-2">
                            <img src={org.logoUrl} alt={org.name} className="h-14 object-contain" />
                            <p className="mt-2 text-sm font-semibold text-slate-100">{org.name}</p>
                        </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-yellow-100 mb-4">Đơn vị tài trợ</h2>
                     <div className="flex justify-center items-center gap-6 flex-wrap bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                        {siteContent.sponsors.length === 0 ? (
                            <p className="text-slate-400 italic py-4">Đang cập nhật</p>
                        ) : siteContent.sponsors.map((sponsor: Sponsor) => (
                        <div key={sponsor.id} className="p-2">
                            <img src={sponsor.logoUrl} alt={sponsor.name} className="h-14 object-contain" />
                             <p className="mt-2 text-sm font-semibold text-slate-100">{sponsor.name}</p>
                        </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    )
}

export default ParticipationGuidePage;
