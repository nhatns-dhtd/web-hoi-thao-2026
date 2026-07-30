import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
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
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg p-6 border border-line" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">Sửa chủ đề</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label htmlFor="topic-title" className="block text-sm font-medium text-ink">Title</label>
            <input
              type="text"
              id="topic-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface-sunken border border-line-strong rounded-md shadow-xs focus:outline-hidden focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
           <div>
            <label htmlFor="topic-description" className="block text-sm font-medium text-ink">Description</label>
            <textarea
              id="topic-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface-sunken border border-line-strong rounded-md shadow-xs focus:outline-hidden focus:ring-amber-500 focus:border-amber-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Image</label>
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md my-2 bg-surface-sunken" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-ink-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="secondary" type="button" onClick={onClose} className="px-4 py-2 rounded-md">Hủy</Button>
          <Button type="button" onClick={handleSave} disabled={isSaving} className="px-4 py-2 rounded-md disabled:opacity-50">
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
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
            <div className="absolute top-2 right-2 z-20 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
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
          className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-amber-900/10 text-left w-full"
        >
          {cardContent}
        </button>
      );
    }

    return (
      <Link to={topic.link} className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-amber-900/10">
        {cardContent}
      </Link>
    );
  };


  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-ink">Giới thiệu</h1>
      <p className="text-center text-ink text-lg mb-10">
        Khám phá các chủ đề chính sẽ được thảo luận và nghiên cứu tại hội thảo.
        {isAdmin && <span className="block text-sm text-brand-ink mt-2">(Admin: Click vào một chủ đề để chỉnh sửa nội dung)</span>}
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