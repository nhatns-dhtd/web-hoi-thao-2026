import React from 'react';
import { SPONSORS_DATA } from '../constants';
import type { Sponsor } from '../types';

const OrganizersSponsorsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Đơn vị tổ chức</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <img src="https://picsum.photos/seed/unilogo/150/150" alt="University Logo" className="w-[120px] h-[120px] rounded-full shadow-md" />
            <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">Trường Đại học ABC</h2>
                <p className="text-gray-600 mt-1">Một trong những đơn vị hàng đầu về nghiên cứu và đào tạo trong lĩnh vực giáo dục tại Việt Nam.</p>
            </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-700">Đơn vị tài trợ & Đối tác</h1>
        <div className="flex justify-center items-center gap-8 flex-wrap">
            {SPONSORS_DATA.map((sponsor: Sponsor) => (
              <div key={sponsor.name} className="text-center p-4 border rounded-lg hover:shadow-xl transition-shadow">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="h-20 object-contain mx-auto" />
                <p className="mt-2 font-semibold text-gray-700">{sponsor.name}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default OrganizersSponsorsPage;
