import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Registration } from '../types';
import * as api from '../api';
import { useAuth } from './AuthContext';

// Chỉ đọc: đăng ký tham dự đi qua Google Form, không còn UI nào ghi vào bảng này.
interface RegistrationContextType {
  registrations: Registration[];
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  // Endpoint này yêu cầu quyền admin (chứa email, số điện thoại người đăng ký), nên chỉ
  // gọi khi đã đăng nhập — nếu không mọi khách vào trang đều nhận 401 vô ích.
  useEffect(() => {
    if (!isAdmin) {
      setRegistrations([]);
      return;
    }
    api.getRegistrations()
      .then(setRegistrations)
      .catch(err => console.error("Failed to fetch registrations:", err));
  }, [isAdmin]);

  return (
    <RegistrationContext.Provider value={{ registrations }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrations = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
};
