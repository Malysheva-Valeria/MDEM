// API конфігурація
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
export const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

// Storage ключі
export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'medai_token';
export const USER_KEY = process.env.REACT_APP_USER_KEY || 'medai_user';

// User ролі
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  SYSTEM_ADMIN: 'system_admin',
};

// Лейбли ролей
export const ROLE_LABELS = {
  [USER_ROLES.PATIENT]: 'Пацієнт',
  [USER_ROLES.DOCTOR]: 'Лікар',
  [USER_ROLES.ADMIN]: 'Адміністратор',
  [USER_ROLES.SYSTEM_ADMIN]: 'Системний адміністратор',
};

// Appointment статус
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
};

// Мітки статусу appointment
export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.PENDING]: 'Очікується',
  [APPOINTMENT_STATUS.CONFIRMED]: 'Підтверджено',
  [APPOINTMENT_STATUS.CANCELLED]: 'Скасовано',
  [APPOINTMENT_STATUS.COMPLETED]: 'Завершено',
  [APPOINTMENT_STATUS.NO_SHOW]: 'Не з\'явився',
};

// Медичні спеціалізації
export const SPECIALIZATIONS = [
  { value: 'general', label: 'Сімейний лікар / Терапевт' },
  { value: 'cardiology', label: 'Кардіологія' },
  { value: 'neurology', label: 'Неврологія' },
  { value: 'pediatrics', label: 'Педіатрія' },
  { value: 'dermatology', label: 'Дерматологія' },
  { value: 'gynecology', label: 'Гінекологія' },
  { value: 'psychiatry', label: 'Психіатрія' },
  { value: 'orthopedics', label: 'Ортопедія' },
  { value: 'ophthalmology', label: 'Офтальмологія' },
  { value: 'dentistry', label: 'Стоматологія' },
  { value: 'endocrinology', label: 'Ендокринологія' },
  { value: 'gastroenterology', label: 'Гастроентерологія' },
];

// Гендерні опції
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Чоловіча' },
  { value: 'female', label: 'Жіноча' },
  { value: 'other', label: 'Інша' },
];

// Групи крові
export const BLOOD_TYPES = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

// Toast Типи
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Маршрути
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_PATIENT: '/register/patient',
  REGISTER_DOCTOR: '/register/doctor',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  APPOINTMENTS: '/appointments',
  NEW_APPOINTMENT: '/appointments/new',
  MEDICAL_RECORDS: '/medical-records',
  AI_DIAGNOSIS: '/ai-diagnosis',
  DOCTORS: '/doctors',
  DOCTOR_PROFILE: '/doctors/:id',
  PATIENTS: '/patients',
  PATIENT_PROFILE: '/patients/:id',
  SETTINGS: '/settings',
  TELEMEDICINE: '/telemedicine',
};

// Пагінація
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Формати дати
export const DATE_FORMAT = 'dd.MM.yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'dd.MM.yyyy HH:mm';

// Завантаження файлу
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// Валідація
export const PASSWORD_MIN_LENGTH = 8;
export const PHONE_REGEX = /^(\+?38)?0\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;