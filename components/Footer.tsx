import React from 'react';
import type { Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const Footer: React.FC = () => {
  const { siteContent } = useSiteContent();
  
  return (
    <footer className="bg-transparent border-t border-slate-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-yellow-100 mb-4">Đối tác & Nhà tài trợ</h3>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {siteContent.sponsors.map((sponsor: Sponsor) => (
              <div key={sponsor.id} className="bg-slate-200/80 p-2 rounded-md shadow-sm">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-slate-100 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Hội thảo quốc tế về nghiên cứu giáo dục. All Rights Reserved.</p>
            <div className="flex justify-center space-x-6">
                <a href="#" className="text-yellow-600 hover:text-blue-500 transition-colors">
                    <i className="fab fa-facebook-f fa-lg"></i>
                </a>
                <a href="#" className="text-yellow-600 hover:text-sky-400 transition-colors">
                    <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="#" className="text-yellow-600 hover:text-red-500 transition-colors">
                    <i className="fab fa-youtube fa-lg"></i>
                </a>
                <a href="#" className="text-yellow-600 hover:text-blue-400 transition-colors">
                    <i className="fab fa-linkedin-in fa-lg"></i>
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;