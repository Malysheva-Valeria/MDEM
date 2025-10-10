import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './Spinner/LoadingSpinner';
import { ROUTES } from '../../constants';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Показати loading під час перевірки аутентифікації
  if (loading) {
    return <LoadingSpinner fullScreen message="Перевірка авторизації..." />;
  }

  // Якщо не авторизований - редирект на login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Якщо потрібна конкретна роль і вона не збігається
  if (requiredRole && user?.role !== requiredRole) {
    // Редирект на дашборд відповідно до ролі
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  // Все ок - рендеримо children
  return children;
};

export default ProtectedRoute;