import React from 'react';
import type { Sponsor } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const OrganizersSponsorsPage: React.FC = () => {
  const { siteContent } = useSiteContent();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="bg-surface backdrop-blur-xs p-8 rounded-xl shadow-xl border border-line/50 text-stone-100">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-amber-100">Đơn vị tổ chức</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <img src={siteContent.universityLogo} alt="Logo Trường Đại học Thủ đô Hà Nội" className="w-[120px] h-[120px] rounded-full shadow-md object-contain bg-white" />
            <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">Trường Đại học Thủ đô Hà Nội</h2>
                <p className="text-stone-300 mt-1">Số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội.</p>
            </div>
        </div>
      </section>

      <section className="bg-surface backdrop-blur-xs p-8 rounded-xl shadow-xl border border-line/50 text-stone-100">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-amber-100">Đơn vị tài trợ & Đối tác</h1>
        <div className="flex justify-center items-center gap-8 flex-wrap">
            {siteContent.sponsors.length === 0 ? (
              <p className="text-stone-400 italic">Đang cập nhật</p>
            ) : siteContent.sponsors.map((sponsor: Sponsor) => (
              <div key={sponsor.id} className="text-center p-4 border border-line rounded-lg hover:shadow-xl transition-shadow">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="h-20 object-contain mx-auto" />
                <p className="mt-2 font-semibold text-stone-200">{sponsor.name}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default OrganizersSponsorsPage;
