import React from 'react';

const UtilitiesTravelPage: React.FC = () => {
  const hotels = [
    { name: "Khách sạn Grand Plaza" },
    { name: "Khách sạn JW Marriott" },
    { name: "Khách sạn Lotte Hà Nội" },
  ];

  const attractions = [
    { name: "Văn Miếu - Quốc Tử Giám", description: "Trường đại học đầu tiên của Việt Nam." },
    { name: "Hồ Hoàn Kiếm và Đền Ngọc Sơn", description: "Trái tim của thủ đô Hà Nội." },
    { name: "Phố cổ Hà Nội", description: "Khu vực sầm uất với kiến trúc và ẩm thực đặc trưng." },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-stone-800/40 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-stone-700/50 text-stone-100 space-y-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-amber-100">Thông tin Tiện ích & Du lịch</h1>
      
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-stone-700 pb-2">Địa điểm và Tiện ích</h2>
        <p className="mb-2"><strong className="w-24 inline-block">Địa điểm:</strong> Trường Đại học Thủ đô Hà Nội, số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội.</p>
        <p className="mb-2"><strong className="w-24 inline-block">Thời gian:</strong> Tháng 11/2026 (dự kiến).</p>
        <p><strong className="w-24 inline-block">Tiện ích:</strong> Thông tin chi tiết về Wi-Fi, ăn uống và đưa đón sẽ được Ban tổ chức cập nhật.</p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-stone-700 pb-2">Khách sạn gợi ý</h2>
        <p className="text-stone-300 mb-3">Một số khách sạn tại khu vực trung tâm Hà Nội, thuận tiện di chuyển tới địa điểm tổ chức:</p>
        <ul className="space-y-2">
            {hotels.map((hotel, index) => (
                <li key={index} className="p-2 bg-stone-900/50 rounded">{hotel.name}</li>
            ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-stone-700 pb-2">Địa điểm tham quan</h2>
        <div className="space-y-3">
            {attractions.map((place, index) => (
                <div key={index}>
                    <h3 className="font-bold">{place.name}</h3>
                    <p className="text-stone-300">{place.description}</p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default UtilitiesTravelPage;
