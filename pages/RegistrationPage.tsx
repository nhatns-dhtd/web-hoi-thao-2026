import React, { useState } from 'react';
import { useRegistrations } from '../contexts/RegistrationContext';
import type { Registration } from '../types';

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    withPaper: 'no',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addRegistration } = useRegistrations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.organization || !formData.email || !formData.phone) {
        setError('Vui lòng điền đầy đủ các trường bắt buộc.');
        return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate API call and then add to context
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      addRegistration(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-lg">
            <div className="text-green-500 mb-4">
                <i className="fas fa-check-circle fa-4x"></i>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Đăng ký thành công!</h2>
            <p className="text-gray-600">Cảm ơn bạn đã đăng ký tham dự hội thảo. Một email xác nhận đã được gửi đến địa chỉ {formData.email}. Chúng tôi mong được chào đón bạn!</p>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">Đăng ký tham dự</h1>
      <p className="text-center text-gray-500 mb-8">Vui lòng điền thông tin của bạn vào biểu mẫu dưới đây.</p>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Tổ chức/Đơn vị công tác <span className="text-red-500">*</span></label>
          <input type="text" name="organization" id="organization" value={formData.organization} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tham gia với bài báo?</label>
            <select name="withPaper" value={formData.withPaper} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="no">Không</option>
                <option value="yes">Có</option>
            </select>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="font-semibold text-gray-700">Thông tin thanh toán</h4>
            <p className="text-sm text-gray-600 mt-1">Phí tham dự hội thảo sẽ được thông báo và hướng dẫn thanh toán qua email sau khi bạn hoàn tất đăng ký.</p>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                </>
            ) : (
                'Gửi đăng ký'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
