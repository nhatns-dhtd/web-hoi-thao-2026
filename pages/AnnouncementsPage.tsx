import React, { useState, useEffect } from 'react';
import type { Announcement } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useAnnouncements } from '../contexts/AnnouncementContext';

const AnnouncementForm: React.FC<{
  announcement?: Announcement | null;
  onSave: (announcement: Omit<Announcement, 'id' | 'date'> & { id?: number; imageUrl?: string; contentImages?: string[] }) => void;
  onCancel: () => void;
}> = ({ announcement, onSave, onCancel }) => {
  const [title, setTitle] = useState(announcement?.title || '');
  const [content, setContent] = useState(announcement?.content || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [contentImageFiles, setContentImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState(announcement?.imageUrl || null);
  const [contentImagePreviews, setContentImagePreviews] = useState<string[]>(announcement?.contentImages || []);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      contentImagePreviews.forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreview, contentImagePreviews]);

  const handleBackgroundFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setContentImageFiles(files);
      contentImagePreviews.forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
      setContentImagePreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processFiles = async () => {
      let backgroundBase64: string | undefined = announcement?.imageUrl;
      let contentBase64s: string[] = announcement?.contentImages || [];

      if (imageFile) {
        backgroundBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      if (contentImageFiles.length > 0) {
        contentBase64s = await Promise.all(
          contentImageFiles.map((file) => new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }))
        );
      }

      onSave({ id: announcement?.id, title, content, imageUrl: backgroundBase64, contentImages: contentBase64s });
    };

    processFiles();
  };

  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500";

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-md mb-6 border-l-4 border-yellow-500">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-100">{announcement ? 'Chỉnh sửa thông báo' : 'Thêm mới thông báo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-100">Tiêu đề</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-100">Nội dung</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={inputStyles}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-100">Ảnh nền</label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full aspect-video object-cover rounded-md my-2 bg-slate-900" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundFileChange}
            className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-900/50 file:text-yellow-300 hover:file:bg-yellow-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-100">Ảnh nội dung (có thể chọn nhiều)</label>
          {contentImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 my-2">
              {contentImagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Content Preview ${index}`} className="w-full aspect-square object-cover rounded-md bg-slate-900" />
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleContentFilesChange}
            className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-900/50 file:text-yellow-300 hover:file:bg-yellow-800/50"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-slate-200 bg-slate-600 hover:bg-slate-500">Hủy</button>
          <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Lưu</button>
        </div>
      </form>
    </div>
  );
};

const AnnouncementDetailModal: React.FC<{
  announcement: Announcement;
  onClose: () => void;
}> = ({ announcement, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-slate-100">{announcement.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 text-xl">&times;</button>
        </div>
        <span className="text-sm text-slate-400 block mb-4">{announcement.date}</span>
        {announcement.imageUrl && (
          <img src={announcement.imageUrl} alt={announcement.title} className="w-full aspect-video object-cover rounded-md mb-4" />
        )}
        <p className="text-slate-100 text-lg mb-6">{announcement.content}</p>
        {announcement.contentImages && announcement.contentImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-100">Ảnh nội dung</h3>
            {announcement.contentImages.map((img, index) => (
              <img key={index} src={img} alt={`Content Image ${index + 1}`} className="w-full object-contain rounded-md" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AnnouncementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const handleSave = (announcement: Omit<Announcement, 'id' | 'date'> & { id?: number; imageUrl?: string; contentImages?: string[] }) => {
    if (announcement.id) { // Editing existing
      updateAnnouncement(announcement.id, { 
        title: announcement.title, 
        content: announcement.content, 
        imageUrl: announcement.imageUrl,
        contentImages: announcement.contentImages,
      });
    } else { // Adding new
      addAnnouncement({
        title: announcement.title,
        content: announcement.content,
        imageUrl: announcement.imageUrl,
        contentImages: announcement.contentImages,
      });
    }
    setIsFormVisible(false);
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormVisible(true);
  };
  
  const handleAddNew = () => {
    setEditingAnnouncement(null);
    setIsFormVisible(true);
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa thông báo?')) {
      deleteAnnouncement(id);
    }
  };

  const handleViewDetail = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-slate-100">Thông báo Hội thảo</h1>
        <p className="text-slate-100 text-lg">Cập nhật các thông tin mới nhất từ ban tổ chức.</p>
         {currentUser?.role === 'admin' && !isFormVisible && (
            <button onClick={handleAddNew} className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg">
                <i className="fas fa-plus mr-2"></i>Thêm thông báo mới
            </button>
        )}
      </div>

      {isFormVisible && (
        <AnnouncementForm 
          announcement={editingAnnouncement}
          onSave={handleSave}
          onCancel={() => { setIsFormVisible(false); setEditingAnnouncement(null); }}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement: Announcement) => (
          <div 
            key={announcement.id} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md border border-slate-700/50 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleViewDetail(announcement)}
          >
            {announcement.imageUrl && (
              <img src={announcement.imageUrl} alt={announcement.title} className="w-full aspect-[4/3] object-cover" />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-slate-100 flex-grow">{announcement.title}</h2>
                <div className="flex-shrink-0 text-right ml-4">
                  <span className="text-xs text-slate-400">{announcement.date}</span>
                  {currentUser?.role === 'admin' && (
                    <div className="mt-1 flex gap-2 text-xs">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(announcement); }} className="text-yellow-100 hover:underline">Chỉnh sửa</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(announcement.id); }} className="text-red-500 hover:underline">Xóa</button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-100 text-sm line-clamp-3">{announcement.content}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <AnnouncementDetailModal 
          announcement={selectedAnnouncement} 
          onClose={() => setSelectedAnnouncement(null)} 
        />
      )}
    </div>
  );
};

export default AnnouncementsPage;