import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Brain,
  FileText,
  Activity,
  TrendingUp,
  Clock,
  Stethoscope,
  AlertCircle,
} from 'lucide-react';
import { ROUTES } from '../../constants';

const PatientDashboard = () => {
  const { user } = useAuth();

  // Mock data - буде замінено на реальні дані з API
  const upcomingAppointments = [
    {
      id: 1,
      doctor_name: 'Д-р Іван Петренко',
      specialization: 'Кардіолог',
      date: '2024-10-15',
      time: '14:30',
      type: 'Консультація',
    },
    {
      id: 2,
      doctor_name: 'Д-р Марія Коваленко',
      specialization: 'Терапевт',
      date: '2024-10-20',
      time: '10:00',
      type: 'Плановий огляд',
    },
  ];

  const healthMetrics = {
    healthScore: 85,
    lastCheckup: '15 днів тому',
    nextCheckup: 'через 2 тижні',
    activeConditions: 0,
  };

  const quickStats = [
    {
      icon: Calendar,
      label: 'Записів',
      value: upcomingAppointments.length,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: FileText,
      label: 'Медичних записів',
      value: '12',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: Activity,
      label: 'Активних лікувань',
      value: healthMetrics.activeConditions,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      icon: TrendingUp,
      label: 'Health Score',
      value: `${healthMetrics.healthScore}%`,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">
            Привіт, {user?.first_name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ось огляд вашого здоров'я та майбутніх прийомів
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Overview */}
            <div className="card">
              <h2 className="card-header flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary-600" />
                Огляд здоров'я
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Загальний показник здоров'я</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {healthMetrics.healthScore}%
                  </span>
                </div>

                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${healthMetrics.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-gray-600">Останній огляд</p>
                    <p className="font-semibold text-gray-900">{healthMetrics.lastCheckup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Наступний огляд</p>
                    <p className="font-semibold text-gray-900">{healthMetrics.nextCheckup}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary-600" />
                  Майбутні прийоми
                </h2>
                <Link to={ROUTES.APPOINTMENTS} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Всі записи →
                </Link>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{appointment.doctor_name}</p>
                        <p className="text-sm text-gray-600">{appointment.specialization}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="medical-badge badge-info">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Немає запланованих прийомів</p>
                  <Link to={ROUTES.NEW_APPOINTMENT} className="btn btn-primary mt-4 inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Записатися на прийом
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Швидкі дії</h3>

              <div className="space-y-3">
                <Link
                  to={ROUTES.AI_DIAGNOSIS}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  ШІ Аналіз симптомів
                </Link>

                <Link
                  to={ROUTES.NEW_APPOINTMENT}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Записатися на прийом
                </Link>

                <Link
                  to={ROUTES.MEDICAL_RECORDS}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Медична картка
                </Link>
              </div>
            </div>

            {/* Health Tips */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Поради для здоров'я</h3>

              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    💧 Не забувайте пити достатньо води - 8 склянок на день
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-900">
                    🚶‍♂️ Прогулянка 30 хвилин на день покращує здоров'я серця
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-900">
                    😴 Якісний сон 7-8 годин на ніч - основа здоров'я
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;