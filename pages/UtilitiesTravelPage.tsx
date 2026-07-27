import React from 'react';

const UtilitiesTravelPage: React.FC = () => {
  const hotels = [
    { name: "Khách sạn Grand Plaza", distance: "1.5 km", link: "#" },
    { name: "Khách sạn JW Marriott", distance: "2.0 km", link: "#" },
    { name: "Khách sạn Lotte Hà Nội", distance: "3.5 km", link: "#" },
  ];

  const attractions = [
    { name: "Văn Miếu - Quốc Tử Giám", description: "Trường đại học đầu tiên của Việt Nam." },
    { name: "Hồ Hoàn Kiếm và Đền Ngọc Sơn", description: "Trái tim của thủ đô Hà Nội." },
    { name: "Phố cổ Hà Nội", description: "Khu vực sầm uất với kiến trúc và ẩm thực đặc trưng." },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800 space-y-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700">Thông tin Tiện ích & Du lịch</h1>
      
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b pb-2">Địa điểm và Tiện ích</h2>
        <p className="mb-2"><strong className="w-24 inline-block">Địa điểm:</strong> Trung tâm Hội nghị Quốc gia, Hà Nội.</p>
        <p className="mb-2"><strong className="w-24 inline-block">Wi-Fi:</strong> Mạng Wi-Fi miễn phí sẽ được cung cấp cho tất cả đại biểu.</p>
        <p><strong className="w-24 inline-block">Ăn uống:</strong> Tiệc trà và bữa trưa được phục vụ tại sảnh chính và nhà hàng trong khuôn viên.</p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b pb-2">Khách sạn gợi ý</h2>
        <ul className="space-y-2">
            {hotels.map((hotel, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{hotel.name} (Cách địa điểm ~{hotel.distance})</span>
                    <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Xem chi tiết</a>
                </li>
            ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b pb-2">Địa điểm tham quan</h2>
        <div className="space-y-3">
            {attractions.map((place, index) => (
                <div key={index}>
                    <h3 className="font-bold">{place.name}</h3>
                    <p className="text-gray-600">{place.description}</p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default UtilitiesTravelPage;
