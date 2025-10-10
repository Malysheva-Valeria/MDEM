import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEY } from '../constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - додає токен до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - обробка помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обробка 401 - неавторизований
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('medai_user');
      window.location.href = '/login';
    }

    // Обробка 403 - доступ заборонено
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    // Обробка 500 - серверна помилка
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Login
  login: async (credentials) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  // Register Patient
  registerPatient: async (userData) => {
    const response = await api.post('/auth/register/patient', userData);
    return response.data;
  },

  // Register Doctor
  registerDoctor: async (userData) => {
    const response = await api.post('/auth/register/doctor', userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    // На бекенді logout endpoint може не існувати якщо використовуємо JWT
    // Просто очищуємо локальне сховище
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('medai_user');
  },
};

// Users API
export const usersAPI = {
  // Get current user
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Patients API
export const patientsAPI = {
  // Get patient profile
  getProfile: async (patientId) => {
    const response = await api.get(`/patients/${patientId}`);
    return response.data;
  },

  // Update patient profile
  updateProfile: async (patientId, data) => {
    const response = await api.put(`/patients/${patientId}`, data);
    return response.data;
  },

  // Get patient's medical records
  getMedicalRecords: async (patientId) => {
    const response = await api.get(`/patients/${patientId}/medical-records`);
    return response.data;
  },
};

// Doctors API
export const doctorsAPI = {
  // Get all doctors
  getAll: async (params = {}) => {
    const response = await api.get('/doctors', { params });
    return response.data;
  },

  // Get doctor by ID
  getById: async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}`);
    return response.data;
  },

  // Update doctor profile
  updateProfile: async (doctorId, data) => {
    const response = await api.put(`/doctors/${doctorId}`, data);
    return response.data;
  },

  // Get doctor's patients
  getPatients: async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}/patients`);
    return response.data;
  },
};

// Appointments API
export const appointmentsAPI = {
  // Get all appointments
  getAll: async (params = {}) => {
    const response = await api.get('/appointments', { params });
    return response.data;
  },

  // Get appointment by ID
  getById: async (appointmentId) => {
    const response = await api.get(`/appointments/${appointmentId}`);
    return response.data;
  },

  // Create appointment
  create: async (data) => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  // Update appointment
  update: async (appointmentId, data) => {
    const response = await api.put(`/appointments/${appointmentId}`, data);
    return response.data;
  },

  // Cancel appointment
  cancel: async (appointmentId) => {
    const response = await api.post(`/appointments/${appointmentId}/cancel`);
    return response.data;
  },

  // Get available slots
  getAvailableSlots: async (doctorId, date) => {
    const response = await api.get(`/appointments/available-slots`, {
      params: { doctor_id: doctorId, date },
    });
    return response.data;
  },
};

// AI Diagnosis API
export const aiAPI = {
  // Analyze symptoms
  analyzeSymptoms: async (symptoms) => {
    const response = await api.post('/ai/analyze-symptoms', symptoms);
    return response.data;
  },

  // Get diagnosis history
  getDiagnosisHistory: async () => {
    const response = await api.get('/ai/diagnosis-history');
    return response.data;
  },
};

export default api;