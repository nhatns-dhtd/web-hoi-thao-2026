import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSiteContent } from '../contexts/SiteContentContext';

const TopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { siteContent } = useSiteContent();

  const topic = siteContent.conferenceTopics.find(t => t.id === Number(topicId));

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Topic Not Found</h1>
        <p className="text-lg text-slate-100">The topic you are looking for does not exist.</p>
        <Link to="/introduction" className="mt-8 inline-block bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors">
            Back to Topics
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
        <img src={topic.imageUrl} alt={topic.title} className="w-full h-64 md:h-96 object-cover" />
        <div className="p-8 md:p-12">
            <h1 className="text-2xl md:text-3xl md:text-4xl font-bold text-yellow-100 mb-6">{topic.title}</h1>
            <div 
              className="prose-lg text-slate-100 max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: topic.description.replace(/\n/g, '<br />') }}
            >
            </div>
             <Link to="/introduction" className="mt-10 inline-block bg-slate-700/50 text-slate-100 font-bold py-3 px-6 rounded-lg hover:bg-slate-600/50 transition-colors border border-slate-600">
                <i className="fas fa-arrow-left mr-2"></i>
                Quay lại Giới thiệu
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
