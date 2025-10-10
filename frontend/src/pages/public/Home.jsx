import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Calendar,
  FileText,
  Video,
  Shield,
  Clock,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '../../constants';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'ШІ Діагностика',
      description: 'Миттєвий аналіз симптомів та рекомендації 24/7',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      icon: Calendar,
      title: 'Онлайн Запис',
      description: 'Зручний запис до лікарів без черг та дзвінків',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'Медична Картка',
      description: 'Вся медична історія в одному безпечному місці',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: Video,
      title: 'Телемедицина',
      description: 'Онлайн консультації з лікарями високої якості',
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      icon: Shield,
      title: 'Безпека Даних',
      description: 'Найвищі стандарти захисту медичних даних',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: Clock,
      title: '24/7 Доступ',
      description: 'Ваше здоров\'я під контролем у будь-який час',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
  ];

  const stats = [
    { label: 'Активних користувачів', value: '10,000+', icon: Users },
    { label: 'Професійних лікарів', value: '500+', icon: Star },
    { label: 'Успішних консультацій', value: '50,000+', icon: Calendar },
    { label: 'Рейтинг задоволеності', value: '4.9/5', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ваше здоров'я під контролем <span className="text-primary-200">ШІ</span>
              </h1>
              <p className="text-xl text-primary-50">
                Інноваційна платформа електронної медицини з підтримкою штучного інтелекту.
                Миттєва діагностика, онлайн консультації, безпечне зберігання медичних даних.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={ROUTES.REGISTER} className="btn bg-white text-primary-600 hover:bg-primary-50 text-center">
                  Почати зараз
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </Link>
                <Link to={ROUTES.AI_DIAGNOSIS} className="btn btn-outline text-white border-white hover:bg-white/10 text-center">
                  Спробувати ШІ діагностику
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden md:block animate-slide-in">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 space-y-2">
                    <Brain className="w-8 h-8 text-primary-500" />
                    <h4 className="font-semibold text-gray-900">ШІ Аналіз</h4>
                    <p className="text-sm text-gray-600">Точність 95%</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 space-y-2">
                    <Calendar className="w-8 h-8 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Запис онлайн</h4>
                    <p className="text-sm text-gray-600">За 30 секунд</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 space-y-2">
                    <Shield className="w-8 h-8 text-yellow-500" />
                    <h4 className="font-semibold text-gray-900">Безпека</h4>
                    <p className="text-sm text-gray-600">GDPR & HIPAA</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 space-y-2">
                    <Video className="w-8 h-8 text-red-500" />
                    <h4 className="font-semibold text-gray-900">Телемедицина</h4>
                    <p className="text-sm text-gray-600">HD якість</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Чому обирають MedicalAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Комплексна платформа для турботи про ваше здоров'я з використанням передових технологій
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card hover:shadow-medical transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${feature.bg} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готові почати турбуватися про своє здоров'я?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Приєднуйтесь до тисяч користувачів, які довіряють MedicalAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.REGISTER_PATIENT} className="btn bg-white text-primary-600 hover:bg-primary-50">
              Реєстрація як пацієнт
            </Link>
            <Link to={ROUTES.REGISTER_DOCTOR} className="btn btn-outline border-white text-white hover:bg-white/10">
              Реєстрація для лікарів
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;