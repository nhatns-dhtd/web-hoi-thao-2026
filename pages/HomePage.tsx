import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { KeynoteSpeaker } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

// Image Lightbox Component
const ImageLightbox: React.FC<{
  imageUrl: string;
  alt: string;
  onClose: () => void;
}> = ({ imageUrl, alt, onClose }) => {
  const [mouseDownOnBackdrop, setMouseDownOnBackdrop] = useState(false);

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    setMouseDownOnBackdrop(e.target === e.currentTarget);
  };

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    if (mouseDownOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
    setMouseDownOnBackdrop(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="flex items-center absolute -top-10 right-0 text-white hover:text-yellow-400 transition-colors"
        >
          <i className="fas fa-times text-2xl"></i>
          <span className="ml-2 text-sm">Đóng</span>
        </button>
        
        {/* Image */}
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Zoom hint */}
        <p className="text-center text-slate-400 text-sm mt-3">
          <i className="fas fa-search-plus mr-2"></i>
          Click bên ngoài để đóng
        </p>
      </div>
    </div>
  );
};

// Speaker Detail Modal Component
const SpeakerModal: React.FC<{
  speaker: KeynoteSpeaker;
  onClose: () => void;
}> = ({ speaker, onClose }) => {
  const [mouseDownOnBackdrop, setMouseDownOnBackdrop] = useState(false);

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    setMouseDownOnBackdrop(e.target === e.currentTarget);
  };

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    if (mouseDownOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
    setMouseDownOnBackdrop(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-yellow-900/80 to-amber-900/60 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
            
            {/* Name & Affiliation */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
              <p className="text-yellow-200 text-sm flex items-center gap-2">
                <i className="fas fa-university"></i>
                {speaker.affiliation}
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Keynote Topic */}
          {speaker.keynoteTopic && (
            <div>
              <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <i className="fas fa-microphone-alt"></i>
                Chủ đề báo cáo
              </h4>
              <p className="text-slate-100 bg-slate-700/50 rounded-lg p-3 border-l-4 border-yellow-500">
                {speaker.keynoteTopic}
              </p>
            </div>
          )}
          
          {/* Bio */}
          {speaker.bio && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <i className="fas fa-user-tie"></i>
                Tiểu sử
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                {speaker.bio}
              </p>
            </div>
          )}
          
          {/* No additional info message */}
          {!speaker.keynoteTopic && !speaker.bio && (
            <p className="text-slate-400 text-center py-4">
              <i className="fas fa-info-circle mr-2"></i>
              Thông tin chi tiết sẽ được cập nhật sau.
            </p>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { siteContent } = useSiteContent();
  const [showCallForPapersLightbox, setShowCallForPapersLightbox] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<KeynoteSpeaker | null>(null);

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24 px-4 sm:px-6 lg:px-8 rounded-lg overflow-hidden text-center"
        style={{ backgroundImage: `url('${siteContent.heroBackground}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {siteContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200">
            {siteContent.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Conference Details Section */}
      <section className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
             <div className="bg-yellow-900/50 text-yellow-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-calendar-alt fa-2x"></i>
             </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Thời gian</h3>
            <p className="text-lg text-slate-100">{siteContent.conferenceDate}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-emerald-900/50 text-emerald-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-map-marker-alt fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Địa điểm</h3>
            <p className="text-lg text-slate-100">{siteContent.conferenceLocation}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-violet-900/50 text-violet-300 rounded-full flex items-center justify-center mb-3 w-[70px] h-[70px]">
                <i className="fas fa-users fa-2x"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Diễn giả</h3>
            <p className="text-lg text-slate-100">Các chuyên gia hàng đầu</p>
          </div>
        </div>
      </section>

      {/* Call for Papers & Keynote Speakers Section - Redesigned */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Call for Papers - Left side (2/5 width on desktop) */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700/50 overflow-hidden h-full flex flex-col">
            <div className="bg-gradient-to-r from-yellow-900/60 to-amber-900/40 px-6 py-4 border-b border-slate-700/50">
              <h3 className="text-xl font-bold text-yellow-100 flex items-center gap-3">
                <i className="fas fa-newspaper text-yellow-400"></i>
                Kêu gọi Bài báo
              </h3>
            </div>
            <div className="p-4 flex-1 flex items-center justify-center">
              <button
                onClick={() => setShowCallForPapersLightbox(true)}
                className="relative group cursor-zoom-in"
              >
                <img
                  src={siteContent.callForPapersImage}
                  alt="Call for Papers"
                  className="w-full max-h-[500px] object-contain rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-md flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    <i className="fas fa-search-plus mr-2"></i>
                    Click để phóng to
                  </span>
                </div>
              </button>
            </div>
            <div className="p-4 pt-0">
              <Link 
                to="/participation-guide" 
                className="block w-full text-center bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-all hover:shadow-lg"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Nộp bài ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Keynote Speakers - Right side (3/5 width on desktop) */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700/50 overflow-hidden h-full flex flex-col">
            <div className="bg-gradient-to-r from-emerald-900/60 to-teal-900/40 px-6 py-4 border-b border-slate-700/50">
              <h3 className="text-xl font-bold text-emerald-100 flex items-center gap-3">
                <i className="fas fa-microphone-alt text-emerald-400"></i>
                Báo cáo viên
              </h3>
            </div>
            <div className="p-6 flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {siteContent.keynoteSpeakers.map((speaker: KeynoteSpeaker) => (
                  <button
                    key={speaker.id}
                    onClick={() => setSelectedSpeaker(speaker)}
                    className="group text-center cursor-pointer hover:bg-slate-700/30 rounded-xl p-3 transition-all duration-300"
                  >
                    {/* Avatar with hover effect */}
                    <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-3">
                      <img
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        className="w-full h-full object-cover rounded-full border-3 border-slate-600 group-hover:border-yellow-500 transition-all duration-300 shadow-lg group-hover:shadow-yellow-500/20"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <i className="fas fa-eye text-white text-lg"></i>
                      </div>
                    </div>
                    {/* Name always visible */}
                    <h4 className="text-sm font-semibold text-slate-100 leading-tight line-clamp-2 group-hover:text-yellow-300 transition-colors">
                      {speaker.name}
                    </h4>
                    {/* Affiliation */}
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {speaker.affiliation}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            {/* Footer with count */}
            <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                <i className="fas fa-users mr-2"></i>
                {siteContent.keynoteSpeakers.length} báo cáo viên
              </span>
              <Link 
                to="/schedule" 
                className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Xem chương trình <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-100">Đừng bỏ lỡ sự kiện quan trọng này!</h2>
        <p className="text-lg text-slate-100 mb-8">
          Hãy đăng ký tham dự ngay hôm nay để cùng chúng tôi khám phá những ý tưởng mới, gặp gỡ các chuyên gia và mở rộng mạng lưới chuyên môn của bạn.
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link 
                to="/participation-guide" 
                className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                Đăng ký ngay
            </Link>
            <Link 
                to="/schedule"
                className="bg-yellow-900/50 text-yellow-50 font-bold py-3 px-8 rounded-lg hover:bg-yellow-800/50 transition-transform transform hover:scale-105 shadow-lg border border-yellow-700"
            >
                Xem chương trình
            </Link>
        </div>
      </section>

      {/* Image Lightbox for Call for Papers */}
      {showCallForPapersLightbox && (
        <ImageLightbox
          imageUrl={siteContent.callForPapersImage}
          alt="Call for Papers"
          onClose={() => setShowCallForPapersLightbox(false)}
        />
      )}

      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
};

export default HomePage;