import React from 'react';

const FeesPage: React.FC = () => {
  const feesData = [
    { category: 'Đăng ký sớm (Trước 15/09/2025)', delegate: '1.500.000 VNĐ', student: '800.000 VNĐ' },
    { category: 'Đăng ký thường (Sau 15/09/2025)', delegate: '2.000.000 VNĐ', student: '1.200.000 VNĐ' },
    { category: 'Đăng ký tại chỗ', delegate: '2.500.000 VNĐ', student: '1.500.000 VNĐ' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Lệ phí tham dự</h1>
      <p className="text-center text-gray-600 mb-8">
        Lệ phí bao gồm tài liệu hội thảo, tiệc trà giữa giờ, và bữa trưa trong các ngày diễn ra sự kiện.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 border font-semibold text-blue-800">Hạng mục</th>
              <th className="p-4 border font-semibold text-blue-800 text-center">Đại biểu</th>
              <th className="p-4 border font-semibold text-blue-800 text-center">Sinh viên/Học viên</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border font-medium">{item.category}</td>
                <td className="p-4 border text-center">{item.delegate}</td>
                <td className="p-4 border text-center">{item.student}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Hướng dẫn thanh toán</h2>
        <p>Thông tin chi tiết về cách thức chuyển khoản sẽ được gửi đến email của bạn sau khi hoàn tất form đăng ký trực tuyến. Vui lòng kiểm tra hộp thư đến (và cả mục spam) để không bỏ lỡ thông tin quan trọng.</p>
        <p><strong>Lưu ý:</strong> Vui lòng giữ lại biên lai hoặc minh chứng chuyển khoản để đối chiếu khi cần thiết.</p>
      </div>

    </div>
  );
};

export default FeesPage;
