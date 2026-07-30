import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-stone-100">Liên hệ</h1>
      <p className="text-center text-stone-100 text-lg mb-10">Chúng tôi sẵn sàng giải đáp mọi thắc mắc của bạn.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-stone-800/50 backdrop-blur-xs p-8 rounded-lg shadow-lg border border-line/50">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-100">Thông tin Ban tổ chức</h2>
          <div>
            <h3 className="font-semibold text-lg text-stone-100 flex items-center"><i className="fas fa-university mr-3 text-amber-500"></i>Đơn vị tổ chức</h3>
            <p className="text-stone-100 ml-8">Trường Đại học Thủ đô Hà Nội - Phòng QLKHCN-HTPT</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-stone-100 flex items-center"><i className="fas fa-map-marker-alt mr-3 text-amber-500"></i>Địa chỉ</h3>
            <p className="text-stone-100 ml-8">Số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội, Việt Nam</p>
          </div>
           <div>
            <h3 className="font-semibold text-lg text-stone-100 flex items-center"><i className="fas fa-envelope mr-3 text-amber-500"></i>Email nhận bài</h3>
            <a href="mailto:afce@hnmu.edu.vn" className="text-amber-100 hover:underline ml-8">afce@hnmu.edu.vn</a>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-stone-100 flex items-center"><i className="fas fa-user-tie mr-3 text-amber-500"></i>Đầu mối liên hệ</h3>
            <p className="text-stone-100 ml-8">TS. Đinh Thị Kim Thương</p>
            <a href="tel:0988766307" className="text-amber-100 hover:underline ml-8 block">0988.766.307</a>
            <a href="mailto:dtkthuong@daihocthudo.edu.vn" className="text-amber-100 hover:underline ml-8 block break-all">dtkthuong@daihocthudo.edu.vn</a>
          </div>
        </div>

        {/* Địa điểm tổ chức */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-100 mb-4">Địa điểm tổ chức</h2>
          <div className="bg-surface-sunken p-6 rounded-lg border border-line space-y-3">
            <p className="text-stone-100">
              <i className="fas fa-building mr-3 text-amber-500"></i>
              Trường Đại học Thủ đô Hà Nội
            </p>
            <p className="text-stone-100">
              <i className="fas fa-map-pin mr-3 text-amber-500"></i>
              Số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội
            </p>
            <p className="text-stone-100">
              <i className="fas fa-calendar-alt mr-3 text-amber-500"></i>
              Tháng 11/2026 (dự kiến)
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Th%E1%BB%A7+%C4%91%C3%B4+H%C3%A0+N%E1%BB%99i+98+D%C6%B0%C6%A1ng+Qu%E1%BA%A3ng+H%C3%A0m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-amber-100 hover:underline"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Xem trên Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;