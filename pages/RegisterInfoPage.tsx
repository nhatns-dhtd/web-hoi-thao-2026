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
            Ban tổ chức hoan nghênh sự tham gia của các nhà khoa học, nhà nghiên cứu, giảng viên, và sinh viên. Vui lòng đọc kỹ các hướng dẫn dưới đây để hoàn tất thủ tục đăng ký tham dự và nộp bài báo.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 border-b pb-2">Nộp bài báo (Call for Papers)</h2>
          <p>
            Chúng tôi khuyến khích các tác giả gửi các công trình nghiên cứu gốc, chưa được công bố. Các bài báo sẽ được bình duyệt bởi hội đồng khoa học.
          </p>
          <div className="mt-4">
            <Link to="/call-for-papers" className="inline-block bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
              Xem chi tiết Call for Papers <i className="fas fa-arrow-right ml-2"></i>
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
            Thông tin chi tiết về các mức lệ phí tham dự và hướng dẫn thanh toán.
          </p>
          <div className="mt-4">
             <Link to="/fees" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Xem Lệ phí tham dự <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RegisterInfoPage;
