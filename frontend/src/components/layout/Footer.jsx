import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { ROUTES } from '../../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 rounded-lg p-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Medical<span className="text-primary-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              Інноваційна платформа електронної медицини з підтримкою штучного інтелекту.
              Ми робимо медичну допомогу доступнішою та ефективнішою.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+380 (44) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>info@medicalai.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>м. Київ, вул. Хрещатик, 1</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-primary-500 transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to={ROUTES.DOCTORS} className="hover:text-primary-500 transition-colors">
                  Лікарі
                </Link>
              </li>
              <li>
                <Link to={ROUTES.AI_DIAGNOSIS} className="hover:text-primary-500 transition-colors">
                  ШІ Діагностика
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition-colors">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition-colors">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Юридична інформація</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-primary-500 transition-colors">
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-500 transition-colors">
                  Умови використання
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="hover:text-primary-500 transition-colors">
                  GDPR
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-primary-500 transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} MedicalAI. Всі права захищені.
            </p>
            <p className="text-xs">
              Створено з ❤️ для покращення медичної допомоги
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;