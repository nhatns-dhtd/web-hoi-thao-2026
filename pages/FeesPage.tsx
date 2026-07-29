import React from 'react';

const FeesPage: React.FC = () => {
  const feesData = [
    {
      category: 'Tác giả là NCS, HVCH, SV; tác giả thuộc đơn vị khác',
      fee: '1.500.000 VNĐ (60 USD)',
    },
    {
      category: 'Tác giả là cán bộ, giảng viên Trường Đại học Thủ đô Hà Nội (nếu đứng độc lập)',
      fee: '0 VNĐ',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Lệ phí công bố, xuất bản Kỷ yếu</h1>
      <p className="text-center text-gray-600 mb-8">
        Các báo cáo được Hội thảo chấp nhận đăng sẽ xuất bản trong Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 border font-semibold text-blue-800">Đối tượng</th>
              <th className="p-4 border font-semibold text-blue-800 text-center">Lệ phí báo cáo toàn văn</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border font-medium">{item.category}</td>
                <td className="p-4 border text-center">{item.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-gray-600 italic">
        Đối với bài viết có tác giả ngoài trường tham gia, kinh phí tính theo số lượng tác giả của bài viết.
      </p>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Cách thức nộp tiền</h2>
        <p>Tác giả nộp lệ phí về tài khoản sau:</p>
        <ul className="space-y-2 bg-gray-50 p-4 rounded-md border">
          <li><strong>Tên tài khoản:</strong> Trường Đại học Thủ đô Hà Nội</li>
          <li><strong>Số tài khoản:</strong> 1507201069189</li>
          <li><strong>Ngân hàng:</strong> Agribank - Chi nhánh Cầu Giấy</li>
          <li><strong>Nội dung:</strong> Lệ phí tham dự HTQT AFCE 2026</li>
        </ul>
        <p><strong>Lưu ý:</strong> Vui lòng giữ lại biên lai hoặc minh chứng chuyển khoản để đối chiếu khi cần thiết.</p>
      </div>

    </div>
  );
};

export default FeesPage;
