import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Brain,
  Users,
  Stethoscope,
  Settings,
  Heart,
} from 'lucide-react';
import { ROUTES, USER_ROLES } from '../../constants';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Навігаційні елементи для різних ролей
  const getNavigationItems = () => {
    const commonItems = [
      {
        name: 'Панель управління',
        icon: LayoutDashboard,
        path: ROUTES.DASHBOARD,
      },
      {
        name: 'Налаштування',
        icon: Settings,
        path: ROUTES.SETTINGS,
      },
    ];

    const patientItems = [
      {
        name: 'Панель управління',
        icon: LayoutDashboard,
        path: ROUTES.DASHBOARD,
      },
      {
        name: 'Мої записи',
        icon: Calendar,
        path: ROUTES.APPOINTMENTS,
      },
      {
        name: 'Медична картка',
        icon: FileText,
        path: ROUTES.MEDICAL_RECORDS,
      },
      {
        name: 'ШІ Діагностика',
        icon: Brain,
        path: ROUTES.AI_DIAGNOSIS,
      },
      {
        name: 'Лікарі',
        icon: Stethoscope,
        path: ROUTES.DOCTORS,
      },
      {
        name: 'Налаштування',
        icon: Settings,
        path: ROUTES.SETTINGS,
      },
    ];

    const doctorItems = [
      {
        name: 'Панель управління',
        icon: LayoutDashboard,
        path: ROUTES.DASHBOARD,
      },
      {
        name: 'Мої пацієнти',
        icon: Users,
        path: ROUTES.PATIENTS,
      },
      {
        name: 'Розклад',
        icon: Calendar,
        path: ROUTES.APPOINTMENTS,
      },
      {
        name: 'ШІ Асистент',
        icon: Brain,
        path: ROUTES.AI_DIAGNOSIS,
      },
      {
        name: 'Налаштування',
        icon: Settings,
        path: ROUTES.SETTINGS,
      },
    ];

    const adminItems = [
      {
        name: 'Панель управління',
        icon: LayoutDashboard,
        path: ROUTES.DASHBOARD,
      },
      {
        name: 'Лікарі',
        icon: Stethoscope,
        path: ROUTES.DOCTORS,
      },
      {
        name: 'Пацієнти',
        icon: Users,
        path: ROUTES.PATIENTS,
      },
      {
        name: 'Записи',
        icon: Calendar,
        path: ROUTES.APPOINTMENTS,
      },
      {
        name: 'Налаштування',
        icon: Settings,
        path: ROUTES.SETTINGS,
      },
    ];

    switch (user?.role) {
      case USER_ROLES.PATIENT:
        return patientItems;
      case USER_ROLES.DOCTOR:
        return doctorItems;
      case USER_ROLES.ADMIN:
      case USER_ROLES.SYSTEM_ADMIN:
        return adminItems;
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-16">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.role === USER_ROLES.PATIENT && 'Пацієнт'}
              {user?.role === USER_ROLES.DOCTOR && 'Лікар'}
              {user?.role === USER_ROLES.ADMIN && 'Адміністратор'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Health Score</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-4/5"></div>
            </div>
            <span className="text-sm font-bold">85%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;