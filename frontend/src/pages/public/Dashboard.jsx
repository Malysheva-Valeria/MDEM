import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES, ROUTES } from '../../constants';
import PatientDashboard from '../patient/Dashboard';
import DoctorDashboard from '../doctor/Dashboard';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Завантаження панелі..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Роутинг на основі ролі користувача
  switch (user?.role) {
    case USER_ROLES.PATIENT:
      return <PatientDashboard />;

    case USER_ROLES.DOCTOR:
      return <DoctorDashboard />;

    case USER_ROLES.ADMIN:
    case USER_ROLES.SYSTEM_ADMIN:
      // TODO: Створити AdminDashboard
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Адміністративна панель
            </h2>
            <p className="text-gray-600">
              Панель адміністратора в розробці
            </p>
          </div>
        </div>
      );

    default:
      return <Navigate to={ROUTES.PROFILE} replace />;
  }
};

export default Dashboard;