// src/components/services/api/appointmentService.js

import axios from "axios";
import { toast } from "react-toastify";

// === 1. Створюємо axios instance ===
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// === 2. Interceptor для JWT токена ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[API Request]",
        config.method?.toUpperCase(),
        config.url,
        config.data || ""
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// === 3. Interceptor для обробки помилок ===
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (process.env.NODE_ENV === "development") {
      console.error(
        "[API Error]",
        status,
        error.response?.data || error.message
      );
    }

    switch (status) {
      case 401:
        toast.error("Сесія закінчилася. Увійдіть знову.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        toast.error("Недостатньо прав для виконання цієї дії.");
        break;
      case 500:
        toast.error("Помилка сервера. Спробуйте пізніше.");
        break;
      default:
        toast.error(
          error.response?.data?.message || "Сталася помилка. Спробуйте знову."
        );
    }

    return Promise.reject(error);
  }
);

// === 4. Методи API ===
export const appointmentService = {
  // Створити запис
  createAppointment: (data) => api.post("/appointments", data),

  // Отримати список записів (з фільтрами)
  getAppointments: (filters = {}) => api.get("/appointments", { params: filters }),

  // Отримати один запис по ID
  getAppointment: (id) => api.get(`/appointments/${id}`),

  // Оновити запис
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),

  // Скасувати запис
  cancelAppointment: (id) => api.patch(`/appointments/${id}/cancel`),

  // Отримати вільні слоти лікаря
  getAvailableSlots: (doctorId, date) =>
    api.get(`/appointments/available-slots`, { params: { doctorId, date } }),
};

export default appointmentService;
