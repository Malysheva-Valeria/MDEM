import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { Mail, Lock, Eye, EyeOff, Heart, ArrowRight } from 'lucide-react';
import { ROUTES, EMAIL_REGEX, PASSWORD_MIN_LENGTH } from '../../constants';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Якщо вже залогінений - редирект на dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
      showSuccess('Успішний вхід! Перенаправлення...');
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || 'Невірний email або пароль';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner fullScreen message="Перевірка авторизації..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="bg-primary-500 rounded-xl p-3">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Medical<span className="text-primary-500">AI</span>
            </span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900">Вхід до системи</h2>
          <p className="mt-2 text-gray-600">
            Введіть свої дані для доступу до особистого кабінету
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="label">
                Email адреса
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                  {...register('email', {
                    required: 'Email обов\'язковий',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Неправильний формат email',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  {...register('password', {
                    required: 'Пароль обов\'язковий',
                    minLength: {
                      value: PASSWORD_MIN_LENGTH,
                      message: `Мінімум ${PASSWORD_MIN_LENGTH} символів`,
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Запам'ятати мене
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Забули пароль?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5 border-2" />
                  <span>Вхід...</span>
                </>
              ) : (
                <>
                  <span>Увійти</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">або</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Не маєте акаунту?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Зареєструватися
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Захищено 256-бітним шифруванням</p>
        </div>
      </div>
    </div>
  );
};

export default Login;