import React from 'react';
import { Link } from 'react-router-dom';

const RegisterInfoPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Thông tin Đăng ký & Nộp bài</h1>
      <div className="space-y-6 text-lg">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 border-b pb-2">Hướng dẫn chung</h2>
          <p>
            Ban tổ chức trân trọng kính mời các cơ quan, tổ chức, chuyên gia, nhà khoa học, giảng viên, giáo viên,
            nghiên cứu sinh, học viên cao học và sinh viên tham gia viết bài và tham dự Diễn đàn Văn hoá và Giáo dục
            mùa thu lần thứ ba (AFCE 2026).
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 border-b pb-2">Nộp bài báo</h2>
          <p>
            Toàn văn báo cáo gửi về Ban tổ chức trước ngày <strong>20/8/2026</strong>, qua form nộp bài trên website
            hoặc gửi file mềm tới email <a href="mailto:afce@hnmu.edu.vn" className="text-blue-600 hover:underline">afce@hnmu.edu.vn</a>.
            Các báo cáo được chấp nhận đăng sẽ xuất bản trong Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam.
          </p>
          <div className="mt-4">
            <Link to="/participation-guide" className="inline-block bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
              Xem hướng dẫn nộp bài <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 border-b pb-2">Đăng ký tham dự</h2>
          <p>
            Tất cả đại biểu tham dự (bao gồm cả tác giả có bài báo) đều cần phải đăng ký.
          </p>
          <div className="mt-4">
             <Link to="/register" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Đi đến trang Đăng ký <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 border-b pb-2">Lệ phí</h2>
          <p>
            Lệ phí công bố báo cáo toàn văn: <strong>1.500.000 VNĐ (60 USD)</strong> đối với tác giả là NCS, HVCH, SV
            và tác giả thuộc đơn vị khác; <strong>0 VNĐ</strong> đối với cán bộ, giảng viên Trường Đại học Thủ đô Hà Nội
            nếu đứng độc lập.
          </p>
          <div className="mt-4">
             <Link to="/participation-guide" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Xem chi tiết lệ phí <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RegisterInfoPage;
