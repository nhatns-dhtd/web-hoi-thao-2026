import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-slate-700/50 text-slate-100">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-teal-100">Về Diễn đàn</h1>
      <p className="text-center text-slate-300 mb-6 italic">
        Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba – AFCE 2026
      </p>
      <div className="space-y-4 text-lg text-slate-200">
        <p>
            Trường Đại học Thủ đô Hà Nội tổ chức Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba với chủ đề
            <strong> “Văn hóa và giáo dục sáng tạo – Giải pháp phát triển bền vững”</strong>, quy mô hội thảo khoa học quốc tế.
        </p>
        <p>
            <strong>Mục đích:</strong> Tạo ra diễn đàn để các nhà khoa học, học giả, chuyên gia, nhà quản lý và những
            quý vị quan tâm trao đổi học thuật, giao lưu, chia sẻ kinh nghiệm liên quan tới các giải pháp phát triển
            bền vững văn hoá và giáo dục sáng tạo trong bối cảnh hiện nay.
        </p>
        <p>
            <strong>Tầm quan trọng:</strong> Đây là diễn đàn học thuật thảo luận về những vấn đề văn hoá, giáo dục
            sáng tạo trong kỷ nguyên số. Đồng thời, hội thảo cũng nhằm xây dựng mạng lưới hợp tác và đưa ra khuyến
            nghị chính sách hỗ trợ sự phát triển bền vững trong lĩnh vực này.
        </p>
        <p>
            <strong>Thời gian và địa điểm:</strong> Dự kiến tháng 11 năm 2026, tại Trường Đại học Thủ đô Hà Nội
            (số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội).
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
