import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { usersAPI } from '../../utils/api';
import { User, Mail, Phone, Calendar, MapPin, Save, Edit } from 'lucide-react';
import { ROLE_LABELS } from '../../constants';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedUser = await usersAPI.updateProfile(formData);
      updateUser(updatedUser);
      showSuccess('Профіль успішно оновлено!');
      setIsEditing(false);
    } catch (error) {
      showError('Помилка при оновленні профілю');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Профіль користувача</h1>
          <p className="text-gray-600 mt-2">Перегляд та редагування особистої інформації</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {user?.first_name} {user?.last_name}
              </h2>

              <p className="text-gray-600 mt-1">
                {ROLE_LABELS[user?.role]}
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>

                {user?.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                    <Phone className="w-4 h-4" />
                    <span>{user?.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                  <Calendar className="w-4 h-4" />
                  <span>Зареєстровано: {new Date(user?.created_at).toLocaleDateString('uk-UA')}</span>
                </div>
              </div>

              <button className="btn btn-outline w-full mt-6">
                Змінити фото
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Особиста інформація</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Редагувати
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
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
                        name="first_name"
                        type="text"
                        disabled={!isEditing}
                        value={formData.first_name}
                        onChange={handleChange}
                        className="input pl-10"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="last_name" className="label">
                      Прізвище
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      disabled={!isEditing}
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input"
                    />
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
                      name="email"
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10"
                    />
                  </div>
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
                      name="phone"
                      type="tel"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={handleChange}
                      className="input pl-10"
                    />
                  </div>
                </div>

                {/* Buttons */}
                {isEditing && (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary flex items-center gap-2 flex-1"
                    >
                      {loading ? (
                        <>
                          <div className="spinner w-5 h-5 border-2" />
                          <span>Збереження...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Зберегти зміни</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          first_name: user?.first_name || '',
                          last_name: user?.last_name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                        });
                      }}
                      className="btn btn-secondary"
                    >
                      Скасувати
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Additional Info Card */}
            <div className="card mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Налаштування безпеки</h3>

              <div className="space-y-4">
                <button className="btn btn-outline w-full text-left">
                  Змінити пароль
                </button>

                <button className="btn btn-outline w-full text-left">
                  Налаштування конфіденційності
                </button>

                <button className="btn btn-outline w-full text-left">
                  Двофакторна автентифікація
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;