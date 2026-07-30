

import React from 'react';
import type { KeynoteSpeaker } from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';

const CallForPapersPage: React.FC = () => {
  const { siteContent } = useSiteContent();
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">Call for Papers & Keynote Speakers</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

        {/* Call for Papers Image Section (2/3 width) */}
        <section className="lg:col-span-2 bg-surface p-4 sm:p-6 rounded-xl shadow-xl border border-line/50">
           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-ink text-center">Thông tin Kêu gọi Bài báo</h2>
           <div className="w-full max-w-2xl mx-auto">
              <img
                src={siteContent.callForPapersImage}
                alt="Thông tin kêu gọi bài báo AFCE 2026"
                className="w-full h-auto object-contain rounded-md shadow-md border border-line"
              />
           </div>
           <p className="mt-6 text-center text-ink-soft">
              Toàn văn báo cáo gửi về email <strong>afce@hnmu.edu.vn</strong> trước ngày <strong>20/8/2026</strong>.
              Các báo cáo được chấp nhận đăng sẽ xuất bản trong Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam.
           </p>
        </section>

        {/* Keynote Speakers Section (1/3 width) */}
        <section className="lg:col-span-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-700 text-center">Báo cáo viên</h2>
          {siteContent.keynoteSpeakers.length === 0 ? (
            <div className="bg-surface p-6 rounded-lg shadow-xl text-center text-ink-muted italic">
              Danh sách báo cáo viên đang được cập nhật.
            </div>
          ) : (
          <div className="bg-surface p-4 rounded-lg shadow-xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {siteContent.keynoteSpeakers.map((speaker : KeynoteSpeaker) => (
              <div key={speaker.id} className="group relative aspect-square" title={`${speaker.name} - ${speaker.keynoteTopic}`}>
                <img 
                  src={speaker.imageUrl} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover rounded-full transition-all duration-300 ease-in-out group-hover:blur-xs group-hover:brightness-50" 
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">{speaker.name}</p>
                  <p className="text-[10px] sm:text-xs text-amber-100 mt-1 font-semibold leading-tight hidden sm:block">{speaker.keynoteTopic}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CallForPapersPage;