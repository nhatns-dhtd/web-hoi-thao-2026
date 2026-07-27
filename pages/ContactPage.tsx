import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Liên hệ</h1>
      <p className="text-center text-slate-100 text-lg mb-10">Chúng tôi sẵn sàng giải đáp mọi thắc mắc của bạn.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-700/50">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-100">Thông tin Ban tổ chức</h2>
          <div>
            <h3 className="font-semibold text-lg text-slate-100 flex items-center"><i className="fas fa-map-marker-alt mr-3 text-yellow-500"></i>Địa chỉ</h3>
            <p className="text-slate-100 ml-8">144 Xuân Thủy, Cầu Giấy, Hà Nội, Việt Nam</p>
          </div>
           <div>
            <h3 className="font-semibold text-lg text-slate-100 flex items-center"><i className="fas fa-envelope mr-3 text-yellow-500"></i>Email</h3>
            <a href="mailto:contact@iceduconf.com" className="text-yellow-100 hover:underline ml-8">contact@iceduconf.com</a>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-100 flex items-center"><i className="fas fa-phone-alt mr-3 text-yellow-500"></i>Điện thoại</h3>
            <p className="text-slate-100 ml-8">(+84) 123 456 789</p>
          </div>
           <div>
            <h3 className="font-semibold text-lg text-slate-100 flex items-center"><i className="fas fa-globe mr-3 text-yellow-500"></i>Website</h3>
            <a href="#" className="text-yellow-100 hover:underline ml-8">www.iceduconf.com</a>
          </div>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-100 mb-4">Bản đồ chỉ đường</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
            {/* Using a static image as a placeholder for an interactive map */}
            <img 
              src="https://picsum.photos/seed/map/600/400" 
              alt="Bản đồ đến địa điểm hội thảo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;