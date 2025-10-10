import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Users,
  Brain,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { ROUTES } from '../../constants';

const DoctorDashboard = () => {
  const { user } = useAuth();

  // Mock data - буде замінено на реальні дані з API
  const todayAppointments = [
    {
      id: 1,
      patient_name: 'Олена Іваненко',
      time: '10:00',
      type: 'Перший прийом',
      status: 'confirmed',
    },
    {
      id: 2,
      patient_name: 'Петро Сидоренко',
      time: '11:30',
      type: 'Повторний огляд',
      status: 'confirmed',
    },
    {
      id: 3,
      patient_name: 'Марія Коваль',
      time: '14:00',
      type: 'Консультація',
      status: 'pending',
    },
  ];

  const stats = [
    {
      icon: Calendar,
      label: 'Сьогодні прийомів',
      value: todayAppointments.length,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+2',
    },
    {
      icon: Users,
      label: 'Всього пацієнтів',
      value: '156',
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+12',
    },
    {
      icon: TrendingUp,
      label: 'Рейтинг',
      value: '4.9',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      change: '+0.2',
    },
    {
      icon: Brain,
      label: 'ШІ Консультацій',
      value: '24',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+5',
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Олена Іваненко',
      lastVisit: '2024-10-10',
      condition: 'Стабільний',
      status: 'success',
    },
    {
      id: 2,
      name: 'Петро Сидоренко',
      lastVisit: '2024-10-08',
      condition: 'Потребує спостереження',
      status: 'warning',
    },
    {
      id: 3,
      name: 'Марія Коваль',
      lastVisit: '2024-10-05',
      condition: 'Стабільний',
      status: 'success',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-error" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">
            Доброго дня, Д-р {user?.last_name}! 👨‍⚕️
          </h1>
          <p className="text-gray-600 mt-2">
            Огляд вашого робочого дня та пацієнтів
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-success mt-1">{stat.change} цього тижня</p>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Appointments */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary-600" />
                  Прийоми сьогодні
                </h2>
                <Link
                  to={ROUTES.APPOINTMENTS}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Весь розклад →
                </Link>
              </div>

              {todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg text-primary-700 font-bold">
                        {appointment.time}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {appointment.patient_name}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusIcon(appointment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Немає запланованих прийомів на сьогодні</p>
                </div>
              )}
            </div>

            {/* Recent Patients */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary-600" />
                  Останні пацієнти
                </h2>
                <Link
                  to={ROUTES.PATIENTS}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Всі пацієнти →
                </Link>
              </div>

              <div className="space-y-3">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        Останній візит: {patient.lastVisit}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`medical-badge ${
                          patient.status === 'success' ? 'badge-success' : 'badge-warning'
                        }`}
                      >
                        {patient.condition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
                  ШІ Асистент
                </Link>

                <Link
                  to={ROUTES.PATIENTS}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Мої пацієнти
                </Link>

                <Link
                  to={ROUTES.APPOINTMENTS}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Розклад
                </Link>
              </div>
            </div>

            {/* Today's Schedule Summary */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Підсумок дня</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Всього прийомів</span>
                  <span className="font-bold text-gray-900">{todayAppointments.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Підтверджено</span>
                  <span className="font-bold text-success">
                    {todayAppointments.filter(a => a.status === 'confirmed').length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Очікує</span>
                  <span className="font-bold text-warning">
                    {todayAppointments.filter(a => a.status === 'pending').length}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Наступний прийом через 45 хв</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h3 className="font-semibold mb-3">💡 Порада</h3>
              <p className="text-sm text-primary-50">
                Використовуйте ШІ-асистента для швидшого аналізу симптомів пацієнтів
                та отримання рекомендацій щодо подальших обстежень.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;