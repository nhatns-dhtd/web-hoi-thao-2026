import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Input, TextArea, Label } from '../components/ui/Field';
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

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md mb-6 border-l-4 border-amber-500">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-ink">{announcement ? 'Chỉnh sửa thông báo' : 'Thêm mới thông báo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            tone="panel"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Nội dung</Label>
          <TextArea
            tone="panel"
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Ảnh nền</Label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full aspect-video object-cover rounded-md my-2 bg-surface-sunken" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundFileChange}
            className="mt-1 block w-full text-sm text-ink-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Ảnh nội dung (có thể chọn nhiều)</label>
          {contentImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 my-2">
              {contentImagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Content Preview ${index}`} className="w-full aspect-square object-cover rounded-md bg-surface-sunken" />
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleContentFilesChange}
            className="mt-1 block w-full text-sm text-ink-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" type="button" onClick={onCancel} className="px-4 py-2 rounded-md">Hủy</Button>
          <button type="submit" className="px-4 py-2 rounded-md text-white bg-brand hover:bg-brand-hover">Lưu</button>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface p-8 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-line-strong">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-ink">{announcement.title}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink text-xl">&times;</button>
        </div>
        <span className="text-sm text-ink-muted block mb-4">{announcement.date}</span>
        {announcement.imageUrl && (
          <img src={announcement.imageUrl} alt={announcement.title} className="w-full aspect-video object-cover rounded-md mb-4" />
        )}
        <p className="text-ink text-lg mb-6">{announcement.content}</p>
        {announcement.contentImages && announcement.contentImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-ink">Ảnh nội dung</h3>
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
        <h1 className="text-4xl font-bold mb-4 text-ink">Thông báo Hội thảo</h1>
        <p className="text-ink text-lg">Cập nhật các thông tin mới nhất từ ban tổ chức.</p>
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
            className="bg-surface rounded-lg shadow-md border border-line/50 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleViewDetail(announcement)}
          >
            {announcement.imageUrl && (
              <img src={announcement.imageUrl} alt={announcement.title} className="w-full aspect-[4/3] object-cover" />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-ink flex-grow">{announcement.title}</h2>
                <div className="flex-shrink-0 text-right ml-4">
                  <span className="text-xs text-ink-muted">{announcement.date}</span>
                  {currentUser?.role === 'admin' && (
                    <div className="mt-1 flex gap-2 text-xs">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(announcement); }} className="text-brand-ink hover:underline">Chỉnh sửa</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(announcement.id); }} className="text-red-500 hover:underline">Xóa</button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-ink text-sm line-clamp-3">{announcement.content}</p>
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