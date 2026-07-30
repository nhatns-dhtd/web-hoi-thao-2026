import React from 'react';
import type { Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const Footer: React.FC = () => {
  const { siteContent } = useSiteContent();
  
  return (
    <footer className="bg-transparent border-t border-line mt-12">
      <div className="container mx-auto px-4 py-8">
        {siteContent.sponsors.length > 0 && (
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-brand-ink mb-4">Đối tác & Nhà tài trợ</h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {siteContent.sponsors.map((sponsor: Sponsor) => (
                <div key={sponsor.id} className="bg-white border border-line p-2 rounded-md shadow-xs">
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="h-12 object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-ink mb-4 md:mb-0">&copy; {new Date().getFullYear()} Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba (AFCE 2026) - Trường Đại học Thủ đô Hà Nội.</p>
            <div className="flex justify-center space-x-6">
                <a href="#" className="text-amber-700 hover:text-blue-700 transition-colors">
                    <i className="fab fa-facebook-f fa-lg"></i>
                </a>
                <a href="#" className="text-amber-700 hover:text-amber-700 transition-colors">
                    <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="#" className="text-amber-700 hover:text-red-700 transition-colors">
                    <i className="fab fa-youtube fa-lg"></i>
                </a>
                <a href="#" className="text-amber-700 hover:text-blue-800 transition-colors">
                    <i className="fab fa-linkedin-in fa-lg"></i>
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;