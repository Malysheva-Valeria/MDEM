import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { TOKEN_KEY, USER_KEY } from '../constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Перевірка токену при завантаженні
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      // Отримати дані користувача
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Auth check failed:', error);
      // Очистити неправильний токен
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);

      // Зберегти токен
      localStorage.setItem(TOKEN_KEY, response.access_token);

      // Отримати дані користувача
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerPatient = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.registerPatient(userData);

      // Зберегти токен
      localStorage.setItem(TOKEN_KEY, response.access_token);

      // Отримати дані користувача
      const user = await authAPI.getCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerDoctor = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.registerDoctor(userData);

      // Зберегти токен
      localStorage.setItem(TOKEN_KEY, response.access_token);

      // Отримати дані користувача
      const user = await authAPI.getCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Doctor registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Завжди очищуємо стан
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    registerPatient,
    registerDoctor,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export default AuthContext;