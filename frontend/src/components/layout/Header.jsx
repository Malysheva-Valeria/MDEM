import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  Heart,
} from 'lucide-react';
import { ROUTES } from '../../constants';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary-500 rounded-lg p-2">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Medical<span className="text-primary-500">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Link to={ROUTES.HOME} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Головна
                </Link>
                <Link to={ROUTES.DOCTORS} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Лікарі
                </Link>
                <Link to={ROUTES.LOGIN} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Вхід
                </Link>
                <Link to={ROUTES.REGISTER} className="btn btn-primary">
                  Реєстрація
                </Link>
              </>
            ) : (
              <>
                <Link to={ROUTES.DASHBOARD} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Панель
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.first_name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 animate-slide-up">
                        <Link
                          to={ROUTES.PROFILE}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Профіль</span>
                        </Link>

                        <Link
                          to={ROUTES.DASHBOARD}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Панель</span>
                        </Link>

                        <Link
                          to={ROUTES.SETTINGS}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Налаштування</span>
                        </Link>

                        <hr className="my-2" />

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left text-error"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Вихід</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-slide-up">
          <nav className="px-4 py-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.HOME}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Головна
                </Link>
                <Link
                  to={ROUTES.DOCTORS}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Лікарі
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Вхід
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="block btn btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Реєстрація
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Панель</span>
                </Link>
                <Link
                  to={ROUTES.PROFILE}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Профіль</span>
                </Link>
                <Link
                  to={ROUTES.SETTINGS}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Налаштування</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-error"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Вихід</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;