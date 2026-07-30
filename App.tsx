import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import TopicsPage from './pages/TopicsPage';
import OrganizersSponsorsPage from './pages/OrganizersSponsorsPage';
import UtilitiesTravelPage from './pages/UtilitiesTravelPage';
import IntroductionPage from './pages/IntroductionPage';
import ParticipationGuidePage from './pages/ParticipationGuidePage';
import PaperReviewPage from './pages/PaperReviewPage';
import { PaperProvider } from './contexts/PaperContext';
import { SiteContentProvider } from './contexts/SiteContentContext';
import DatabaseViewPage from './pages/DatabaseViewPage';
import TopicDetailPage from './pages/TopicDetailPage';
import { RegistrationProvider } from './contexts/RegistrationContext';
import { AnnouncementProvider } from './contexts/AnnouncementContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <PaperProvider>
          <RegistrationProvider>
            <AnnouncementProvider>
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/topics" element={<TopicsPage />} />
                      <Route path="/topic/:topicId" element={<TopicDetailPage />} />
                      <Route path="/introduction" element={<IntroductionPage />} />
                      <Route path="/participation-guide" element={<ParticipationGuidePage />} />
                      <Route path="/paper-review" element={<PaperReviewPage />} />
                      <Route path="/schedule" element={<SchedulePage />} />
                      <Route path="/announcements" element={<AnnouncementsPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/organizers-sponsors" element={<OrganizersSponsorsPage />} />
                      <Route path="/utilities-travel" element={<UtilitiesTravelPage />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute>
                            <AdminPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route
                        path="/admin/database"
                        element={
                          <ProtectedRoute>
                            <DatabaseViewPage />
                          </ProtectedRoute>
                        }
                      />
                      {/* /submit-paper và /register từng chạy được nên có thể đã lọt ra
                          ngoài qua email hoặc Google index; không có route này thì các
                          URL đó render trắng giữa header và footer. */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </AnnouncementProvider>
          </RegistrationProvider>
        </PaperProvider>
      </SiteContentProvider>
    </AuthProvider>
  );
};

export default App;