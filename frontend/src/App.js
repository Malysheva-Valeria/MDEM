import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ROUTES, USER_ROLES } from './constants';

// Публічні сторінки
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Захищені сторінки
import Dashboard from './pages/public/Dashboard';
import Profile from './pages/public/Profile';

// Placeholder сторінки (TODO: Implement)
const PlaceholderPage = ({ title }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="card text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600">Ця сторінка в розробці</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ToastProvider>
            <Layout>
              <Routes>
                {/* Публічні маршрути */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />

                {/* Захищені маршрути */}
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Маршрути пацієнта */}
                <Route
                  path={ROUTES.APPOINTMENTS}
                  element={
                    <ProtectedRoute requiredRole={USER_ROLES.PATIENT}>
                      <PlaceholderPage title="Мої записи" />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.MEDICAL_RECORDS}
                  element={
                    <ProtectedRoute requiredRole={USER_ROLES.PATIENT}>
                      <PlaceholderPage title="Медична картка" />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.AI_DIAGNOSIS}
                  element={
                    <ProtectedRoute>
                      <PlaceholderPage title="ШІ Діагностика" />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.DOCTORS}
                  element={
                    <ProtectedRoute requiredRole={USER_ROLES.PATIENT}>
                      <PlaceholderPage title="Пошук лікарів" />
                    </ProtectedRoute>
                  }
                />

                {/* Маршрути доктора */}
                <Route
                  path={ROUTES.PATIENTS}
                  element={
                    <ProtectedRoute requiredRole={USER_ROLES.DOCTOR}>
                      <PlaceholderPage title="Мої пацієнти" />
                    </ProtectedRoute>
                  }
                />

                {/* Налаштування */}
                <Route
                  path={ROUTES.SETTINGS}
                  element={
                    <ProtectedRoute>
                      <PlaceholderPage title="Налаштування" />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback - 404 */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Сторінку не знайдено</p>
                        <a href={ROUTES.HOME} className="btn btn-primary">
                          На головну
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Layout>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;