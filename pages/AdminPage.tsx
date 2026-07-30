import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type {
    AddPaperInput,
    DetailedPaperSubmission,
    KeynoteSpeaker,
    PresentationStatus,
    ReviewStatus,
    Sponsor,
    SiteContentImageKey,
} from '../types';
import { useSiteContent } from '../contexts/SiteContentContext';
import { usePapers } from '../contexts/PaperContext';
import { useRegistrations } from '../contexts/RegistrationContext';

const REVIEW_STATUSES: ReviewStatus[] = ['Duyệt', 'Không duyệt', 'Đang chờ duyệt'];
const PRESENTATION_STATUSES: PresentationStatus[] = ['Trình bày', 'Không trình bày'];

const StatCard: React.FC<{ icon: string; title: string; value: number; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-stone-800/50 backdrop-blur-xs p-6 rounded-lg shadow-md flex items-center border border-stone-700/50">
        <div className={`rounded-full p-4 mr-4 ${color}`}>
            <i className={`fas ${icon} fa-2x text-white`}></i>
        </div>
        <div>
            <p className="text-sm text-stone-400">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-stone-100">{value}</p>
        </div>
    </div>
);

const ManagementCard: React.FC<{
    imageUrl: string;
    title: string;
    description?: string;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ imageUrl, title, description, onEdit, onDelete }) => (
    <div className="bg-stone-800/50 p-4 rounded-lg shadow-md border border-stone-700/50 flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-32 object-contain rounded-md bg-stone-900/50 p-1 mb-4" />
        <div className="flex-grow">
            <h3 className="text-lg font-semibold text-stone-100 truncate" title={title}>{title}</h3>
            {description && <p className="text-sm text-stone-400">{description}</p>}
        </div>
        <div className="mt-4 flex justify-end gap-2">
            <button onClick={onEdit} className="text-sm font-medium text-amber-100 hover:text-amber-300 py-1 px-3 rounded bg-amber-900/50 hover:bg-amber-800/50">Edit</button>
            <button onClick={onDelete} className="text-sm font-medium text-red-400 hover:text-red-300 py-1 px-3 rounded bg-red-900/50 hover:bg-red-800/50">Delete</button>
        </div>
    </div>
);

const ImageUploadCard: React.FC<{
    title: string;
    currentImage: string;
    onImageSelect: (file: File) => void;
}> = ({ title, currentImage, onImageSelect }) => {
    const inputId = `upload-${title.replace(/\s+/g, '-')}`;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="bg-stone-800/50 p-4 rounded-lg shadow-md border border-stone-700/50 flex flex-col">
            <h3 className="text-lg font-semibold text-stone-100 mb-2 truncate" title={title}>{title}</h3>
            <div className="w-full h-32 mb-4">
              <img src={currentImage} alt={title} className="w-full h-full rounded-md bg-stone-900/50 p-1 object-contain" />
            </div>
            <label htmlFor={inputId} className="cursor-pointer w-full text-center block bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors mt-auto">
                Change Image
            </label>
            <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
    );
};

// Generic Modal for editing items
const EditModal: React.FC<{
    item: KeynoteSpeaker | Sponsor | null;
    itemType: 'speaker' | 'sponsor';
    onClose: () => void;
    onSave: (itemData: any) => void;
}> = ({ item, itemType, onClose, onSave }) => {
    const [formData, setFormData] = useState<any>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setFormData(item || {});
        setImagePreview(item ? (item as any).imageUrl || (item as any).logoUrl : null);
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (itemType === 'speaker') {
                    onSave({ ...formData, imageUrl: base64String });
                } else {
                    onSave({ ...formData, logoUrl: base64String });
                }
            };
            reader.readAsDataURL(imageFile);
        } else {
            onSave(formData);
        }
    };
    
    const inputStyles = "mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md shadow-xs focus:outline-hidden focus:ring-amber-500 focus:border-amber-500";
    const labelStyles = "block text-sm font-medium text-stone-100";

    const getTitle = () => {
        if (itemType === 'speaker') return 'Keynote Speaker';
        if (itemType === 'sponsor') return 'Sponsor/Partner';
        return 'Item';
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onMouseDown={onClose}>
            <div className="bg-stone-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-stone-700" onMouseDown={e => e.stopPropagation()}>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-100 mb-4">{item?.id ? 'Edit' : 'Add'} {getTitle()}</h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className={inputStyles} />
                    {itemType === 'speaker' && (
                        <>
                            <input type="text" name="affiliation" value={formData.affiliation || ''} onChange={handleChange} placeholder="Affiliation" className={inputStyles} />
                            <textarea name="bio" value={formData.bio || ''} onChange={handleChange} placeholder="Bio" className={inputStyles} rows={3}></textarea>
                            <input type="text" name="keynoteTopic" value={formData.keynoteTopic || ''} onChange={handleChange} placeholder="Keynote Topic" className={inputStyles} />
                        </>
                    )}
                    {(itemType === 'speaker' || itemType === 'sponsor') && (
                        <div>
                            <label className={labelStyles}>Image/Logo</label>
                            {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-40 object-contain rounded-md my-2 bg-stone-900" />}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-900/50 file:text-amber-300 hover:file:bg-amber-800/50"/>
                        </div>
                    )}
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-md text-stone-200 bg-stone-600 hover:bg-stone-500">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 rounded-md text-white bg-amber-600 hover:bg-amber-700">Save</button>
                </div>
            </div>
        </div>
    );
};


// Bài báo không còn nộp qua web (tác giả nộp bằng Google Form), nên admin tự nhập
// danh sách vào bảng để công bố kết quả duyệt.
const PaperModal: React.FC<{
    paper: DetailedPaperSubmission | null;
    topics: { id: number; title: string }[];
    onClose: () => void;
    onSave: (data: AddPaperInput) => Promise<void>;
}> = ({ paper, topics, onClose, onSave }) => {
    const [form, setForm] = useState<AddPaperInput>({
        paperCode: paper?.paperCode || '',
        authorName: paper?.authorName || '',
        organization: paper?.organization || '',
        paperTitle: paper?.paperTitle || '',
        topic: paper?.topic || 1,
        abstractStatus: paper?.abstractStatus || 'Đang chờ duyệt',
        fullTextStatus: paper?.fullTextStatus || 'Đang chờ duyệt',
        reviewStatus: paper?.reviewStatus || 'Đang chờ duyệt',
        presentationStatus: paper?.presentationStatus || 'Không trình bày',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'topic' ? parseInt(value, 10) as 1 | 2 | 3 : value }));
    };

    const handleSubmit = async () => {
        if (!form.authorName.trim() || !form.paperTitle.trim()) {
            alert('Vui lòng nhập tên tác giả và tên bài báo.');
            return;
        }
        setSaving(true);
        try {
            await onSave(form);
            onClose();
        } catch (err) {
            alert(`Lưu thất bại: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setSaving(false);
        }
    };

    const inputStyles = "mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md shadow-xs focus:outline-hidden focus:ring-amber-500 focus:border-amber-500 text-stone-100";
    const labelStyles = "block text-sm font-medium text-stone-100";

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onMouseDown={onClose}>
            <div className="bg-stone-800 rounded-lg shadow-xl w-full max-w-2xl p-6 border border-stone-700" onMouseDown={e => e.stopPropagation()}>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-100 mb-4">{paper ? 'Sửa bài báo' : 'Thêm bài báo'}</h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div>
                        <label className={labelStyles}>Mã số bài viết</label>
                        <input type="text" name="paperCode" value={form.paperCode || ''} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label className={labelStyles}>Tên tác giả *</label>
                        <input type="text" name="authorName" value={form.authorName} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label className={labelStyles}>Đơn vị công tác</label>
                        <input type="text" name="organization" value={form.organization} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label className={labelStyles}>Tên bài báo *</label>
                        <input type="text" name="paperTitle" value={form.paperTitle} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label className={labelStyles}>Chủ đề</label>
                        <select name="topic" value={form.topic} onChange={handleChange} className={inputStyles}>
                            {topics.map(t => (
                                <option key={t.id} value={t.id}>Chủ đề {t.id}: {t.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyles}>Duyệt tóm tắt</label>
                            <select name="abstractStatus" value={form.abstractStatus} onChange={handleChange} className={inputStyles}>
                                {REVIEW_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Duyệt toàn văn</label>
                            <select name="fullTextStatus" value={form.fullTextStatus} onChange={handleChange} className={inputStyles}>
                                {REVIEW_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Duyệt đăng kỷ yếu</label>
                            <select name="reviewStatus" value={form.reviewStatus} onChange={handleChange} className={inputStyles}>
                                {REVIEW_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Trình bày</label>
                            <select name="presentationStatus" value={form.presentationStatus} onChange={handleChange} className={inputStyles}>
                                {PRESENTATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} disabled={saving} className="px-4 py-2 rounded-md text-stone-200 bg-stone-600 hover:bg-stone-500 disabled:opacity-50">Hủy</button>
                    <button onClick={handleSubmit} disabled={saving} className="px-4 py-2 rounded-md text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50">
                        {saving ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminPage: React.FC = () => {
    const { siteContent, updateImage, updateConferenceInfo, addKeynoteSpeaker, updateKeynoteSpeaker, deleteKeynoteSpeaker, addSponsorOrCoOrganizer, updateSponsorOrCoOrganizer, deleteSponsorOrCoOrganizer } = useSiteContent();
    const { papers, addPaper, updatePaperDetails, deletePaper } = usePapers();
    const { registrations } = useRegistrations();
    const [paperModal, setPaperModal] = useState<{ isOpen: boolean; paper: DetailedPaperSubmission | null }>({ isOpen: false, paper: null });

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        item: KeynoteSpeaker | Sponsor | null;
        itemType: 'speaker' | 'sponsor';
        subType?: 'sponsor' | 'coOrganizer';
    }>({ isOpen: false, item: null, itemType: 'sponsor' });

    const [confInfo, setConfInfo] = useState({
        title: siteContent.heroTitle,
        subtitle: siteContent.heroSubtitle,
        date: siteContent.conferenceDate,
        location: siteContent.conferenceLocation,
    });

    const handleConfInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfInfo({ ...confInfo, [e.target.name]: e.target.value });
    }

    const handleSaveConfInfo = () => {
        updateConferenceInfo(confInfo);
        alert('Conference info updated!');
    }
    
    const handleImageUpload = (imageKey: SiteContentImageKey, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateImage(imageKey, reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleOpenModal = (item: KeynoteSpeaker | Sponsor | null, itemType: 'speaker' | 'sponsor', subType?: 'sponsor' | 'coOrganizer') => {
        setModalState({ isOpen: true, item, itemType, subType });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, item: null, itemType: 'sponsor' });
    };

    const handleSave = (itemData: any) => {
        if (modalState.itemType === 'speaker') {
            itemData.id ? updateKeynoteSpeaker(itemData.id, itemData) : addKeynoteSpeaker(itemData);
        } else {
            itemData.id ? updateSponsorOrCoOrganizer(itemData.id, itemData, modalState.subType!) : addSponsorOrCoOrganizer(itemData, modalState.subType!);
        }
        handleCloseModal();
    };
    
    const handleSavePaper = async (data: AddPaperInput) => {
        if (paperModal.paper) {
            await updatePaperDetails(paperModal.paper.id, data);
        } else {
            await addPaper(data);
        }
    };

    const handleDeletePaper = async (id: number) => {
        if (!window.confirm('Xóa bài báo này?')) return;
        try {
            await deletePaper(id);
        } catch (err) {
            alert(`Xóa thất bại: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    const handleDelete = (id: number, type: 'speaker' | 'sponsor' | 'coOrganizer') => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        if(type === 'speaker') deleteKeynoteSpeaker(id);
        else deleteSponsorOrCoOrganizer(id, type);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <h1 className="text-4xl font-bold text-center mb-4 text-stone-100">Admin Dashboard</h1>
                <p className="text-center text-stone-100 text-lg mb-10">Thống kê và báo cáo tổng quan hội thảo.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard icon="fa-users" title="Tổng số đăng ký" value={registrations.length} color="bg-blue-500" />
                    <StatCard icon="fa-file-alt" title="Bài báo đã nộp" value={papers.length} color="bg-purple-500" />
                </div>
            </div>

            {/* Content Management Section */}
            <div className="space-y-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-100 border-b-2 border-stone-700 pb-4">Quản lý nội dung</h2>
                
                {/* General Conference Info */}
                <div>
                     <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-8">Thông tin chung về hội thảo</h3>
                     <div className="bg-stone-800/50 p-6 rounded-lg shadow-md border border-stone-700/50 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-100">Tiêu đề chính homepage</label>
                            <input type="text" name="title" value={confInfo.title} onChange={handleConfInfoChange} className="mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-100">Tiêu đề phụ homepage</label>
                            <input type="text" name="subtitle" value={confInfo.subtitle} onChange={handleConfInfoChange} className="mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-100">Ngày diễn ra hội thảo</label>
                                <input type="text" name="date" value={confInfo.date} onChange={handleConfInfoChange} className="mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-100">Địa điểm hội thảo</label>
                                <input type="text" name="location" value={confInfo.location} onChange={handleConfInfoChange} className="mt-1 block w-full px-3 py-2 bg-stone-900 border border-stone-600 rounded-md"/>
                            </div>
                        </div>
                        <div className="text-right">
                            <button onClick={handleSaveConfInfo} className="bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">Lưu</button>
                        </div>
                     </div>
                </div>

                {/* Papers / Review results */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-amber-100">Kết quả duyệt bài</h3>
                        <button onClick={() => setPaperModal({ isOpen: true, paper: null })} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Thêm bài báo</button>
                    </div>
                    <p className="text-sm text-stone-400 mb-4">
                        Tác giả nộp bài qua Google Form, Ban tổ chức nhập danh sách tại đây để công bố trên trang Kết quả duyệt bài.
                    </p>
                    <div className="bg-stone-800/50 p-4 rounded-lg shadow-md border border-stone-700/50">
                        {papers.length === 0 ? (
                            <p className="text-stone-400 italic text-center py-6">Chưa có bài báo nào.</p>
                        ) : (
                            <ul className="space-y-2">
                                {papers.map(paper => (
                                    <li key={paper.id} className="flex items-center justify-between gap-4 p-3 bg-stone-900/50 rounded-md">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-stone-100 truncate" title={paper.paperTitle}>
                                                {paper.paperCode ? `[${paper.paperCode}] ` : ''}{paper.paperTitle}
                                            </p>
                                            <p className="text-sm text-stone-400 truncate">
                                                {paper.authorName}
                                                {paper.organization ? ` — ${paper.organization}` : ''}
                                                {` · Chủ đề ${paper.topic} · ${paper.reviewStatus}`}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button onClick={() => setPaperModal({ isOpen: true, paper })} className="text-sm font-medium text-amber-100 hover:text-amber-300 py-1 px-3 rounded bg-amber-900/50 hover:bg-amber-800/50">Sửa</button>
                                            <button onClick={() => handleDeletePaper(paper.id)} className="text-sm font-medium text-red-400 hover:text-red-300 py-1 px-3 rounded bg-red-900/50 hover:bg-red-800/50">Xóa</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Keynote Speakers */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="text-xl sm:text-2xl font-semibold text-amber-100">Diễn giả chính</h3>
                         <button onClick={() => handleOpenModal(null, 'speaker')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Thêm diễn giả</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {siteContent.keynoteSpeakers.map(speaker => (
                            <ManagementCard 
                                key={speaker.id}
                                imageUrl={speaker.imageUrl}
                                title={speaker.name}
                                description={speaker.affiliation}
                                onEdit={() => handleOpenModal(speaker, 'speaker')}
                                onDelete={() => handleDelete(speaker.id, 'speaker')}
                            />
                        ))}
                    </div>
                </div>

                {/* Sponsors & Partners */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="text-xl sm:text-2xl font-semibold text-amber-100">Nhà tài trợ & Đối tác</h3>
                         <div>
                            <button onClick={() => handleOpenModal(null, 'sponsor', 'coOrganizer')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mr-2">Thêm đồng tổ chức</button>
                            <button onClick={() => handleOpenModal(null, 'sponsor', 'sponsor')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Thêm nhà tài trợ</button>
                         </div>
                    </div>
                    <h4 className="text-xl font-medium text-stone-100 mb-4">Đồng tổ chức</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                         {siteContent.coOrganizers.map(item => (
                            <ManagementCard 
                                key={item.id}
                                imageUrl={item.logoUrl}
                                title={item.name}
                                onEdit={() => handleOpenModal(item, 'sponsor', 'coOrganizer')}
                                onDelete={() => handleDelete(item.id, 'coOrganizer')}
                            />
                        ))}
                    </div>
                    <h4 className="text-xl font-medium text-stone-100 mb-4">Nhà tài trợ</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {siteContent.sponsors.map(item => (
                            <ManagementCard 
                                key={item.id}
                                imageUrl={item.logoUrl}
                                title={item.name}
                                onEdit={() => handleOpenModal(item, 'sponsor', 'sponsor')}
                                onDelete={() => handleDelete(item.id, 'sponsor')}
                            />
                        ))}
                    </div>
                </div>

                 {/* General Images */}
                <div>
                     <h3 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-8">Ảnh trên website</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ImageUploadCard title="Logo hội thảo" currentImage={siteContent.conferenceLogo} onImageSelect={(file) => handleImageUpload('conferenceLogo', file)} />
                        <ImageUploadCard title="Logo trường đại học" currentImage={siteContent.universityLogo} onImageSelect={(file) => handleImageUpload('universityLogo', file)} />
                        <ImageUploadCard title="Hình nền trang chủ" currentImage={siteContent.heroBackground} onImageSelect={(file) => handleImageUpload('heroBackground', file)} />
                        <ImageUploadCard title="Hình nền kêu gọi bài báo" currentImage={siteContent.callForPapersImage} onImageSelect={(file) => handleImageUpload('callForPapersImage', file)} />
                    </div>
                </div>
            </div>


            <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-stone-100">Database Management</h2>
                <div className="bg-stone-800/50 p-6 rounded-lg shadow-md border border-stone-700/50 text-center">
                    <p className="text-stone-100 mb-4">View the raw data used in this mock application.</p>
                    <Link to="/admin/database" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg">
                        <i className="fas fa-database mr-2"></i>View Mock Database
                    </Link>
                </div>
            </div>

             {modalState.isOpen && (
                <EditModal
                    item={modalState.item}
                    itemType={modalState.itemType}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}

            {paperModal.isOpen && (
                <PaperModal
                    paper={paperModal.paper}
                    topics={siteContent.conferenceTopics ?? []}
                    onClose={() => setPaperModal({ isOpen: false, paper: null })}
                    onSave={handleSavePaper}
                />
            )}
        </div>
    );
};

export default AdminPage;
