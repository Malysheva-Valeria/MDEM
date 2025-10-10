import React, { useState } from 'react';
import { Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import {
  Mail, Lock, Eye, EyeOff, Heart, ArrowRight, User, Phone, Stethoscope, Users
} from 'lucide-react';
import { ROUTES, EMAIL_REGEX, PASSWORD_MIN_LENGTH, PHONE_REGEX, SPECIALIZATIONS } from '../../constants';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { registerPatient, registerDoctor, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(searchParams.get('type') || 'patient');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Підготовка даних для реєстрації
      const userData = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      };

      // Додаткові дані для лікаря
      if (userType === 'doctor') {
        userData.specialization = data.specialization;
        userData.license_number = data.license_number;
        userData.education = data.education;
        await registerDoctor(userData);
      } else {
        await registerPatient(userData);
      }

      showSuccess('Реєстрація успішна! Перенаправлення...');
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || 'Помилка реєстрації. Спробуйте ще раз.';
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
      <div className="max-w-2xl w-full space-y-8">
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

          <h2 className="text-3xl font-bold text-gray-900">Реєстрація</h2>
          <p className="mt-2 text-gray-600">
            Створіть акаунт для доступу до медичних послуг
          </p>
        </div>

        {/* User Type Selector */}
        <div className="card">
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType('patient')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all
                ${userType === 'patient' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Пацієнт</span>
            </button>

            <button
              type="button"
              onClick={() => setUserType('doctor')}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all
                ${userType === 'doctor' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <Stethoscope className="w-5 h-5" />
              <span className="font-medium">Лікар</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="label">
                  Ім'я
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="Іван"
                    className={`input pl-10 ${errors.first_name ? 'input-error' : ''}`}
                    {...register('first_name', {
                      required: 'Ім\'я обов\'язкове',
                      minLength: { value: 2, message: 'Мінімум 2 символи' },
                    })}
                  />
                </div>
                {errors.first_name && (
                  <p className="mt-1 text-sm text-error">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="label">
                  Прізвище
                </label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Петренко"
                  className={`input ${errors.last_name ? 'input-error' : ''}`}
                  {...register('last_name', {
                    required: 'Прізвище обов\'язкове',
                    minLength: { value: 2, message: 'Мінімум 2 символи' },
                  })}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-error">{errors.last_name.message}</p>
                )}
              </div>
            </div>

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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="label">
                Телефон
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+380501234567"
                  className={`input pl-10 ${errors.phone ? 'input-error' : ''}`}
                  {...register('phone', {
                    required: 'Телефон обов\'язковий',
                    pattern: {
                      value: PHONE_REGEX,
                      message: 'Формат: +380501234567',
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
              )}
            </div>

            {/* Doctor-specific fields */}
            {userType === 'doctor' && (
              <>
                <div>
                  <label htmlFor="specialization" className="label">
                    Спеціалізація
                  </label>
                  <select
                    id="specialization"
                    className={`input ${errors.specialization ? 'input-error' : ''}`}
                    {...register('specialization', {
                      required: 'Спеціалізація обов\'язкова',
                    })}
                  >
                    <option value="">Оберіть спеціалізацію</option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec.value} value={spec.value}>
                        {spec.label}
                      </option>
                    ))}
                  </select>
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-error">{errors.specialization.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="license_number" className="label">
                    Номер ліцензії
                  </label>
                  <input
                    id="license_number"
                    type="text"
                    placeholder="Ліцензія №"
                    className={`input ${errors.license_number ? 'input-error' : ''}`}
                    {...register('license_number', {
                      required: 'Номер ліцензії обов\'язковий',
                    })}
                  />
                  {errors.license_number && (
                    <p className="mt-1 text-sm text-error">{errors.license_number.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="education" className="label">
                    Освіта
                  </label>
                  <textarea
                    id="education"
                    rows="2"
                    placeholder="Опишіть вашу медичну освіту..."
                    className={`input ${errors.education ? 'input-error' : ''}`}
                    {...register('education')}
                  />
                </div>
              </>
            )}

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
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm_password" className="label">
                Підтвердження паролю
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input pl-10 pr-10 ${errors.confirm_password ? 'input-error' : ''}`}
                  {...register('confirm_password', {
                    required: 'Підтвердження паролю обов\'язкове',
                    validate: (value) =>
                      value === password || 'Паролі не співпадають',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-error">{errors.confirm_password.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-1 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                {...register('terms', {
                  required: 'Необхідно прийняти умови',
                })}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Я приймаю{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  умови використання
                </Link>{' '}
                та{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  політику конфіденційності
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-error">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5 border-2" />
                  <span>Реєстрація...</span>
                </>
              ) : (
                <>
                  <span>Зареєструватися</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Вже маєте акаунт?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Увійти
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;