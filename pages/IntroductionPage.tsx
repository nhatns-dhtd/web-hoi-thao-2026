import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../contexts/SiteContentContext';
import { useAuth } from '../contexts/AuthContext';
import type { ConferenceTopic } from '../types';

// Modal Component
const EditTopicModal: React.FC<{
  topic: ConferenceTopic;
  onSave: (topicId: number, data: { title: string; imageUrl: string, description: string }) => void;
  onClose: () => void;
}> = ({ topic, onSave, onClose }) => {
  const [title, setTitle] = useState(topic.title);
  const [description, setDescription] = useState(topic.description);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(topic.imageUrl);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Revoke object URL on cleanup
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onSave(topic.id, { title, imageUrl: base64String, description });
        setIsSaving(false);
      };
      reader.readAsDataURL(imageFile);
    } else {
      onSave(topic.id, { title, imageUrl: topic.imageUrl, description });
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-700" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4">Edit Topic</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label htmlFor="topic-title" className="block text-sm font-medium text-slate-100">Title</label>
            <input
              type="text"
              id="topic-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
           <div>
            <label htmlFor="topic-description" className="block text-sm font-medium text-slate-100">Description</label>
            <textarea
              id="topic-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-100">Image</label>
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md my-2 bg-slate-900" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-900/50 file:text-yellow-300 hover:file:bg-yellow-800/50"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-200 bg-slate-600 hover:bg-slate-500">Cancel</button>
          <button type="button" onClick={handleSave} disabled={isSaving} className="px-4 py-2 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-500">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};


const IntroductionPage: React.FC = () => {
  const { siteContent, updateConferenceTopic } = useSiteContent();
  const { currentUser } = useAuth();
  const [editingTopic, setEditingTopic] = useState<ConferenceTopic | null>(null);

  const isAdmin = currentUser?.role === 'admin';

  const handleSaveTopic = (topicId: number, data: { title: string; imageUrl: string; description: string }) => {
    updateConferenceTopic(topicId, data);
    setEditingTopic(null);
  };
  
  const TopicCard: React.FC<{ topic: ConferenceTopic }> = ({ topic }) => {
    const cardContent = (
      <div
        className="relative h-96 flex items-center justify-center p-6 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${topic.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
        {isAdmin && (
            <div className="absolute top-2 right-2 z-20 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                <i className="fas fa-edit mr-1"></i> Edit
            </div>
        )}
        <h2 className="relative z-10 text-xl sm:text-2xl font-bold text-white leading-tight">
          {topic.title}
        </h2>
      </div>
    );

    if (isAdmin) {
      return (
        <button
          onClick={() => setEditingTopic(topic)}
          className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sky-500/20 text-left w-full"
        >
          {cardContent}
        </button>
      );
    }

    return (
      <Link to={topic.link} className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sky-500/20">
        {cardContent}
      </Link>
    );
  };


  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-slate-100">Giới thiệu</h1>
      <p className="text-center text-slate-100 text-lg mb-10">
        Khám phá các chủ đề chính sẽ được thảo luận và nghiên cứu tại hội thảo.
        {isAdmin && <span className="block text-sm text-yellow-100 mt-2">(Admin: Click vào một chủ đề để chỉnh sửa nội dung)</span>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteContent.conferenceTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {editingTopic && (
        <EditTopicModal 
          topic={editingTopic}
          onSave={handleSaveTopic}
          onClose={() => setEditingTopic(null)}
        />
      )}
    </div>
  );
};

export default IntroductionPage;