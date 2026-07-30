import React, { useState } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import type { NavLink } from '../types';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useSiteContent } from '../contexts/SiteContentContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const { currentUser, logout } = useAuth();
  const { siteContent } = useSiteContent();

  const linkClasses = "block py-2 px-3 text-ink-soft rounded-lg hover:bg-amber-200/60 hover:text-brand-ink md:border-0 md:px-2 md:py-1 transition-colors duration-200";
  const activeLinkClasses = "text-amber-700 font-semibold bg-amber-200/60 md:bg-transparent";

  const ExternalIcon = () => <i className="fas fa-external-link-alt text-[10px] ml-2 opacity-60"></i>;

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  }

  const handleLogout = () => {
    logout();
    closeAllMenus();
  }

  const toggleMainMenu = () => {
    if (isMenuOpen) {
      setOpenMobileDropdown(null);
    }
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {/* sticky chứ không fixed: header vẫn chiếm chỗ trong layout nên không cần đệm
          padding-top cho từng trang, và giữ đúng mốc `sticky top-36` của trang Chương trình. */}
      <header className="bg-page/90 backdrop-blur-xl shadow-md shadow-amber-900/10 sticky top-0 z-50 border-b border-line-strong">
        <div className="container mx-auto p-4">
          {/* Top row: Logo, Title, User Info, and Toggle */}
          <div className="flex items-center justify-between gap-2">
            {/* Logo and Title Section */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse min-w-0 flex-1" onClick={closeAllMenus}>
              <div className="flex flex-col md:flex-row items-center gap-2 flex-shrink-0">
                <img src={siteContent.conferenceLogo} alt="Conference Logo" className="w-[40px] sm:w-[50px] md:w-[60px] h-auto rounded-md object-contain" />
                <img src={siteContent.universityLogo} alt="University Logo" className="w-[40px] sm:w-[50px] md:w-[60px] h-auto rounded-md object-contain" />
              </div>
              <div className="flex text-left min-w-0 flex-col gap-2">
                <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-brand-ink uppercase leading-tight tracking-tight">Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba</h1>
                <h2 className="text-xs sm:text-sm md:text-base font-medium text-amber-800/90 leading-tight">Văn hóa và giáo dục sáng tạo – Giải pháp phát triển bền vững</h2>
              </div>
            </Link>

            {/* User Info and Toggle Button */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {currentUser && (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold text-ink text-sm">Welcome, {currentUser.username}</p>
                    <p className="text-xs text-amber-700 capitalize">{currentUser.role}</p>
                  </div>
                  <button onClick={handleLogout} className="hidden sm:inline-block text-white font-medium rounded-lg text-sm px-4 py-2 text-center bg-red-600 hover:bg-red-700 transition-colors">
                    Logout
                  </button>
                </>
              )}
              <button
                onClick={toggleMainMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-ink-soft rounded-lg md:hidden hover:bg-amber-200/60 focus:outline-hidden focus:ring-2 focus:ring-stone-600 flex-shrink-0"
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile User Info (shown when logged in on mobile) */}
          {currentUser && (
            <div className="sm:hidden mt-2 pb-2 border-b border-line/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink text-sm">Welcome, {currentUser.username}</p>
                  <p className="text-xs text-amber-700 capitalize">{currentUser.role}</p>
                </div>
                <button onClick={handleLogout} className="text-white font-medium rounded-lg text-sm px-3 py-1.5 text-center bg-red-600 hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Navigation Menu - Full width below */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 border border-line-strong rounded-xl bg-surface/95 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent justify-center">
              {NAV_LINKS.map((link: NavLink) => {
                if (link.path === '/admin' && currentUser?.role !== 'admin') {
                  return null;
                }

                if (link.children) {
                  const isMobileDropdownOpen = openMobileDropdown === link.name;
                  return (
                    <li key={link.id} className="relative group">
                      <button
                        onClick={() => setOpenMobileDropdown(isMobileDropdownOpen ? null : link.name)}
                        className="w-full flex items-center justify-between py-2 px-3 text-ink-soft rounded-lg hover:bg-amber-200/60 hover:text-brand-ink md:border-0 md:px-2 md:py-1 transition-colors duration-200"
                        aria-haspopup="true"
                        aria-expanded={isMobileDropdownOpen}
                      >
                        {link.name}
                        <svg className="w-2.5 h-2.5 ms-2.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                      </button>

                      {/* Desktop Dropdown */}
                      <div className="absolute top-full left-0 z-20 w-64 hidden group-hover:block bg-surface/98 backdrop-blur-xl rounded-xl shadow-2xl shadow-amber-900/10 border border-line-strong mt-1 overflow-hidden">
                        <ul className="py-2 text-sm text-ink" aria-label={link.name}>
                          {link.children.map((child) => (
                            <li key={child.id}>
                              {child.external ? (
                                <a
                                  href={child.path!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-5 py-3 text-ink-soft hover:bg-amber-200/60 hover:text-brand-ink transition-colors border-b border-line/60 last:border-0"
                                  onClick={closeAllMenus}
                                >
                                  {child.name}
                                  <ExternalIcon />
                                </a>
                              ) : (
                                <RouterNavLink to={child.path!} className={({ isActive }) => `block px-5 py-3 transition-colors border-b border-line/60 last:border-0 ${isActive ? 'text-amber-700 bg-amber-200/60 font-medium' : 'text-ink-soft hover:bg-amber-200/60 hover:text-brand-ink'}`} onClick={closeAllMenus}>
                                  {child.name}
                                </RouterNavLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mobile Dropdown */}
                      {isMobileDropdownOpen && (
                        <div className="pt-2 ps-4 md:hidden">
                          <ul className="space-y-2">
                            {link.children.map((child) => (
                              <li key={child.id}>
                                {child.external ? (
                                  <a
                                    href={child.path!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 rounded-lg text-ink-soft hover:bg-amber-200/60 hover:text-brand-ink transition-colors"
                                    onClick={closeAllMenus}
                                  >
                                    {child.name}
                                    <ExternalIcon />
                                  </a>
                                ) : (
                                  <RouterNavLink to={child.path!} className={({ isActive }) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'text-amber-700 bg-amber-200/60 font-medium' : 'text-ink-soft hover:bg-amber-200/60 hover:text-brand-ink'}`} onClick={closeAllMenus}>
                                    {child.name}
                                  </RouterNavLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.id}>
                    {link.external ? (
                      <a
                        href={link.path!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                        onClick={closeAllMenus}
                      >
                        {link.name}
                        <ExternalIcon />
                      </a>
                    ) : (
                      <RouterNavLink
                        to={link.path!}
                        className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                        onClick={closeAllMenus}
                      >
                        {link.name}
                      </RouterNavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
