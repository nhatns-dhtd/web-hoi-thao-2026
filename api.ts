import type { AddPaperInput, User, Registration, Announcement, DetailedPaperSubmission, SiteContent } from './types';

const API_BASE_URL = '/api';

// Helper function for fetch requests
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    // Cookie session là httpOnly nên JS không đọc được; phải để browser tự gửi kèm.
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'API request failed');
  }
  
  if (response.status === 204 || response.status === 200 && response.headers.get('content-length') === '0') {
    return;
  }

  return response.json();
};


// --- AUTH & USERS ---
export const login = (username: string, password: string): Promise<User> => {
  return fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const logout = (): Promise<void> => {
  return fetchAPI('/logout', { method: 'POST' });
};

/** Trả về user của phiên hiện tại, hoặc null nếu chưa đăng nhập (API trả 401). */
export const getCurrentUser = async (): Promise<User | null> => {
  const response = await fetch(`${API_BASE_URL}/me`, { credentials: 'same-origin' });
  if (response.status === 401) return null;
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'Không kiểm tra được phiên đăng nhập');
  }
  return response.json();
};

export const getUsers = (): Promise<User[]> => {
  return fetchAPI('/users');
};


// --- REGISTRATIONS ---
export const getRegistrations = (): Promise<Registration[]> => {
  return fetchAPI('/registrations');
};


// --- ANNOUNCEMENTS ---
export const getAnnouncements = (): Promise<Announcement[]> => {
  return fetchAPI('/announcements');
};

export const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>): Promise<Announcement> => {
  return fetchAPI('/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateAnnouncement = (id: number, data: Partial<Announcement>): Promise<Announcement> => {
  return fetchAPI(`/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteAnnouncement = (id: number): Promise<{ id: number }> => {
  return fetchAPI(`/announcements/${id}`, {
    method: 'DELETE',
  });
};


// --- PAPERS ---
export const getPapers = (): Promise<DetailedPaperSubmission[]> => {
  return fetchAPI('/papers');
};

export const getPaper = (id: number): Promise<DetailedPaperSubmission> => {
  return fetchAPI(`/papers/${id}`);
};

export const addPaper = (data: AddPaperInput): Promise<DetailedPaperSubmission> => {
  return fetchAPI('/papers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updatePaper = (id: number, data: Partial<DetailedPaperSubmission>): Promise<DetailedPaperSubmission> => {
  return fetchAPI(`/papers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deletePaper = (id: number): Promise<{ id: number }> => {
  return fetchAPI(`/papers/${id}`, {
    method: 'DELETE',
  });
};

// --- SITE CONTENT ---
export const getSiteContent = (): Promise<SiteContent> => {
  return fetchAPI('/site-content');
};

export const updateSiteContent = (data: Partial<SiteContent>): Promise<SiteContent> => {
  return fetchAPI('/site-content', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};