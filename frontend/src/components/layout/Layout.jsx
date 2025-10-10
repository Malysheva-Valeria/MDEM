import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Сторінки без sidebar (home, login, register)
  const publicPages = ['/', '/login', '/register'];
  const isPublicPage = publicPages.includes(location.pathname) ||
                       location.pathname.startsWith('/register/');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar тільки для authenticated users і не на public pages */}
        {isAuthenticated && !isPublicPage && <Sidebar />}

        {/* Main Content */}
        <main
          className={`
            flex-1 w-full
            ${isAuthenticated && !isPublicPage ? 'md:ml-64' : ''}
          `}
        >
          <div className="w-full min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;