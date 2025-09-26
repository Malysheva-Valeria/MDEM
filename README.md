# 🏥 Medical AI System
## Інтегрована платформа електронної медицини з штучним інтелектом

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Зміст

- [Про проект](#-про-проект)
- [Функціонал](#-функціонал)
- [Технологічний стек](#-технологічний-стек)
- [Швидкий старт](#-швидкий-старт)
- [Детальна установка](#-детальна-установка)
- [Розробка](#-розробка)
- [API Документація](#-api-документація)
- [Тестування](#-тестування)
- [Деплоймент](#-деплоймент)
- [Внесок у проект](#-внесок-у-проект)
- [Команда](#-команда)

---

## 🩺 Про проект

**Medical AI System** - це сучасна медична платформа, яка поєднує традиційні функції електронної медицини з потужними можливостями штучного інтелекту. Система створена для покращення якості медичної допомоги через автоматизацію діагностики, оптимізацію робочих процесів та підвищення доступності медичних послуг.

### 🎯 Основні цілі:
- **Пацієнтоцентричність** - зручність та безпека для пацієнтів
- **Ефективність** - автоматизація рутинних медичних процесів  
- **Точність** - ШІ-підтримка для медичної діагностики
- **Доступність** - простота використання для всіх користувачів
- **Безпека** - найвищі стандарти захисту медичних даних

---

## ⚡ Функціонал

### 👤 Для пацієнтів:
- 📱 **Особистий кабінет** з повною медичною історією
- 🤖 **ШІ-аналіз симптомів** 24/7 з рекомендаціями  
- 📅 **Онлайн запис** до лікарів без черг
- 💬 **Телеконсультації** з лікарями
- 📊 **Моніторинг здоров'я** з носимими пристроями
- 🔔 **Smart нагадування** про ліки та прийоми

### 👨‍⚕️ Для лікарів:
- 🧠 **ШІ-помічник** для діагностики та рекомендацій
- 📋 **Електронні медкартки** з повною історією пацієнтів
- 📈 **Аналітика** ефективності лікування
- 🗓️ **Управління розкладом** та прийомами
- 📱 **Мобільний доступ** до всіх функцій
- 🔬 **Інтеграція** з лабораторіями та медобладнанням

### 🏥 Для медзакладів:
- 📊 **Управлінська панель** з детальною аналітикою
- 💰 **Фінансовий облік** та звітність
- 👥 **Управління персоналом** та пацієнтами
- 📈 **Показники ефективності** та якості
- 🔗 **Інтеграції** з існуючими медсистемами
- 🛡️ **Compliance** з медичними стандартами

---

## 🛠 Технологічний стек

### **Backend:**
- **Python 3.11+** - основна мова розробки
- **FastAPI** - сучасний веб-фреймворк для API
- **PostgreSQL 15+** - надійна реляційна база даних
- **SQLAlchemy** - ORM для роботи з базою даних
- **Alembic** - система міграцій бази даних
- **JWT** - безпечна аутентифікація користувачів
- **Pydantic** - валідація та серіалізація даних

### **Frontend:**
- **React 18+** - сучасна JavaScript бібліотека
- **Material-UI v5** - готові UI компоненти  
- **React Router v6** - клієнтський роутинг
- **Axios** - HTTP клієнт для API запитів
- **React Hook Form** - ефективна робота з формами
- **React Query** - кешування та синхронізація даних

### **AI/ML:**
- **scikit-learn** - класичні алгоритми машинного навчання
- **TensorFlow/PyTorch** - глибоке навчання
- **spaCy** - обробка природної мови медичних текстів
- **Pandas/NumPy** - аналіз медичних даних

### **DevOps:**
- **Docker & Docker Compose** - контейнеризація
- **GitHub Actions** - CI/CD pipeline  
- **Nginx** - reverse proxy та load balancer
- **Redis** - кешування та черги завдань

---

## 🚀 Швидкий старт

### Мінімальні вимоги:
- **Docker 20.10+** та **Docker Compose v2**
- **Git** для клонування репозиторію
- **4GB RAM** та **10GB** вільного місця

### 1️⃣ Клонування репозиторію:
```bash
git clone https://github.com/your-org/medical-ai-system.git
cd medical-ai-system
```

### 2️⃣ Налаштування конфігурації:
```bash
# Скопіювати файл з налаштуваннями
cp .env.example .env

# Відредагувати конфігурацію (опціонально)
nano .env
```

### 3️⃣ Запуск системи:
```bash
# Збудувати та запустити всі сервіси
make setup

# Або вручну:
docker-compose build
docker-compose up -d
docker-compose exec backend alembic upgrade head
```

### 4️⃣ Доступ до системи:
- **🌐 Веб-додаток**: http://localhost:3000
- **📡 API**: http://localhost:8000  
- **📚 API Документація**: http://localhost:8000/docs
- **🗄️ База даних**: localhost:5432

### 5️⃣ Тестові акаунти:
```bash
# Лікар
Email: doctor@medical-ai.com
Пароль: SecurePass123!

# Пацієнт  
Email: patient@medical-ai.com
Пароль: SecurePass123!

# Адміністратор
Email: admin@medical-ai.com
Пароль: AdminPass123!
```

---

## 📦 Детальна установка

### Опція 1: Docker (Рекомендовано)

```bash
# 1. Підготовка
git clone https://github.com/your-org/medical-ai-system.git
cd medical-ai-system

# 2. Конфігурація
cp .env.example .env
# Відредагуйте .env файл за потреби

# 3. Запуск
make build    # Збудувати контейнери
make up       # Запустити сервіси  
make migrate  # Застосувати міграції БД

# 4. Перевірка
make logs     # Переглянути логи
```

### Опція 2: Локальна розробка

#### Backend:
```bash
cd backend

# Створити віртуальне середовище
python -m venv venv
source venv/bin/activate  # Linux/Mac
# або venv\Scripts\activate  # Windows

# Встановити залежності
pip install -r requirements.txt

# Налаштувати базу даних
createdb medical_db
alembic upgrade head

# Запустити сервер
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend:
```bash
cd frontend

# Встановити залежності
npm install

# Запустити development сервер
npm start
```

---

## 💻 Розробка

### Структура проекту:
```
medical-ai-system/
├── 📄 README.md                    # Ця документація
├── 📄 .gitignore                   # Git ignore файли
├── 📄 .env.example                 # Приклад конфігураційних змінних
├── 📄 docker-compose.yml           # Docker контейнери для розробки
├── 📄 docker-compose.prod.yml      # Docker для продакшену
├── 📄 Makefile                     # Команди для автоматизації
├── 📄 package.json                 # NPM скрипти для всього проекту
├── 📁 docs/                        # Вся документація проекту
├── 📁 scripts/                     # Скрипти для деплою та обслуговування
├── 📁 frontend/                    # React додаток
│   ├── 📁 public/                  # Статичні файли
│   │   ├── 📄 index.html
│   │   ├── 📄 manifest.json
│   │   └── 📁 medical-icons/
│   ├── 📁 src/
│   │   ├── 📁 components/          # React компоненти
│   │   │   ├── 📁 common/          # Загальні UI компоненти
│   │   │   ├── 📁 medical/         # Медичні компоненти
│   │   │   ├── 📁 forms/           # Медичні форми
│   │   │   ├── 📁 charts/          # Графіки та візуалізації
│   │   │   └── 📁 layout/          # Layout компоненти
│   │   ├── 📁 pages/               # Сторінки додатку
│   │   │   ├── 📁 auth/            # Сторінки аутентифікації
│   │   │   ├── 📁 patient/         # Сторінки пацієнта
│   │   │   ├── 📁 doctor/          # Сторінки лікаря
│   │   │   └── 📁 admin/           # Адміністративні сторінки
│   │   ├── 📁 services/            # API сервіси
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📁 contexts/            # React context для state management
│   │   ├── 📁 utils/               # Допоміжні функції
│   │   ├── 📁 constants/           # Константи додатку
│   │   ├── 📁 styles/              # Глобальні стилі та теми
│   │   └── 📁 theme/               # Material-UI тема
│   ├── 📄 package.json             # NPM залежності
│   ├── 📄 tsconfig.json            # TypeScript конфігурація (опціонально)
│   └── 📄 .env.local               # Локальні змінні середовища
├── 📁 backend/                     # Python FastAPI додаток
│   ├── 📁 app/                     # Основний додаток
│   │   ├── 📄 __init__.py
│   │   ├── 📄 main.py              # FastAPI додаток та налаштування
│   │   ├── 📄 config.py            # Конфігурація додатку
│   │   ├── 📄 database.py          # База даних підключення
│   │   ├── 📁 models/              # SQLAlchemy моделі
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py
│   │   │   ├── 📄 patient.py
│   │   │   ├── 📄 doctor.py
│   │   │   ├── 📄 appointment.py
│   │   │   └── 📄 medical_record.py
│   │   ├── 📁 schemas/             # Pydantic схеми для валідації
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py
│   │   │   ├── 📄 patient.py
│   │   │   └── 📄 doctor.py
│   │   ├── 📁 api/                 # API endpoints
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📁 v1/              # API версія 1
│   │   │   │   ├── 📄 __init__.py
│   │   │   │   ├── 📄 api.py       # Головний API router
│   │   │   │   └── 📁 endpoints/
│   │   │   │       ├── 📄 auth.py
│   │   │   │       ├── 📄 users.py
│   │   │   │       ├── 📄 patients.py
│   │   │   │       ├── 📄 doctors.py
│   │   │   │       ├── 📄 appointments.py
│   │   │   │       └── 📄 ai_diagnosis.py
│   │   │   └── 📄 dependencies.py   # Dependency injection
│   │   ├── 📁 crud/                # CRUD операції
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py
│   │   │   ├── 📄 patient.py
│   │   │   └── 📄 doctor.py
│   │   ├── 📁 services/            # Бізнес логіка сервіси
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 auth_service.py
│   │   │   └── 📄 patient_service.py
│   │   ├── 📁 core/                # Основна функціональність
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 security.py      # Аутентифікація та безпека
│   │   │   ├── 📄 deps.py          # Dependencies
│   │   │   ├── 📄 permissions.py   # Система ролей та дозволів
│   │   │   └── 📄 logging.py       # Логування системи
│   │   ├── 📁 ai/                  # ШІ та ML компоненти
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📁 models/          # ML моделі
│   │   │   ├── 📁 preprocessing/   # Обробка даних
│   │   │   ├── 📁 inference/       # Виконання прогнозів
│   │   │   └── 📁 training/        # Навчання моделей
│   │   └── 📁 utils/               # Допоміжні функції
│   │       ├── 📄 __init__.py
│   │       └── 📄 helpers.py
│   ├── 📁 tests/                   # Unit тести
│   │   ├── 📄 __init__.py
│   │   ├── 📄 conftest.py
│   │   ├── 📄 test_auth.py
│   │   ├── 📄 test_users.py
│   │   └── 📄 test_patients.py
│   ├── 📁 alembic/                 # База даних міграції
│   │   ├── 📄 env.py
│   │   ├── 📄 script.py.mako
│   │   └── 📁 versions/
│   │       └── 📄 001_initial_schema.py
│   ├── 📄 requirements.txt         # Python залежності
│   ├── 📄 Dockerfile              # Docker контейнер
│   └── 📄 alembic.ini             # Alembic конфігурація
├── 📁 shared/                      # Спільні типи та константи
├── 📁 infrastructure/              # DevOps та хмарна інфраструктура
├── 📁 ml-models/                   # Машинне навчання та ШІ
│   ├── 📁 data/                    # Навчальні та тестові дані
│   │   ├── 📁 raw/                 # Сирі медичні дані
│   │   ├── 📁 processed/           # Оброблені дані для навчання
│   │   └── 📁 external/            # Зовнішні медичні датасети
│   ├── 📁 notebooks/               # Jupyter notebooks для досліджень
│   ├── 📁 models/                  # Навчені ML моделі
│   │   ├── 📁 symptom_classifier/
│   │   ├── 📁 diagnosis_predictor/
│   │   └── 📁 risk_assessment/
│   ├── 📁 training/                # Скрипти для навчання моделей
│   ├── 📁 evaluation/              # Оцінка якості моделей
│   ├── 📁 deployment/              # Деплой моделей у продакшен
│   └── 📁 monitoring/              # Моніторинг ефективності моделей
├── 📁 database/                    # SQL скрипти та міграції
│   ├── 📁 migrations/              # SQL міграції
│   │   ├── 📄 V001__initial_schema.sql
│   │   ├── 📄 V002__add_users.sql
│   │   ├── 📄 V003__add_medical_data.sql
│   │   └── 📄 V004__add_ai_tables.sql
│   ├── 📁 seeds/                   # Початкові дані
│   │   ├── 📄 specializations.sql
│   │   ├── 📄 sample_users.sql
│   │   └── 📄 medical_codes.sql
│   ├── 📁 functions/               # PostgreSQL функції
│   ├── 📁 views/                   # Database views
│   ├── 📁 indexes/                 # Оптимізаційні індекси
│   ├── 📁 triggers/                # Database triggers
│   └── 📁 backups/                 # Backup скрипти
│       ├── 📄 backup.sh
│       └── 📄 restore.sh
├── 📁 tests/                       # Інтеграційні та E2E тести
└── 📁 monitoring/                  # Моніторинг та логування
```

### Корисні команди:

```bash
# 🐳 Docker команди
make build          # Збудувати контейнери
make up             # Запустити сервіси
make down           # Зупинити сервіси  
make logs           # Показати логи
make shell-backend  # Зайти в backend контейнер
make shell-db       # Зайти в PostgreSQL

# 🗄️ База даних
make migrate        # Застосувати міграції
make migrate-auto   # Створити авто-міграцію

# 🧪 Тестування  
make test-backend   # Тести backend
make test-frontend  # Тести frontend

# 🧹 Очистка
make clean          # Видалити контейнери та volumes
```

### Git workflow:

```bash
# Створити нову фічу
git checkout develop
git pull origin develop
git checkout -b feature/appointment-booking

# Розробка...
git add .
git commit -m "feat: add appointment booking functionality"

# Оновити develop та зробити rebase
git checkout develop  
git pull origin develop
git checkout feature/appointment-booking
git rebase develop

# Запушити та створити PR
git push origin feature/appointment-booking
```

---

## 📡 API Документація

### Автоматична документація:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc  
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### Основні endpoints:

#### Аутентифікація:
```http
POST /api/v1/auth/login           # Вхід користувача
POST /api/v1/auth/register/patient # Реєстрація пацієнта
POST /api/v1/auth/register/doctor  # Реєстрація лікаря
```

#### Користувачі:
```http  
GET  /api/v1/users/me            # Поточний користувач
PUT  /api/v1/users/me            # Оновити профіль
GET  /api/v1/users/{user_id}     # Користувач за ID
```

#### Пацієнти:
```http
GET  /api/v1/patients/           # Список пацієнтів
POST /api/v1/patients/           # Створити пацієнта
GET  /api/v1/patients/{id}       # Пацієнт за ID
PUT  /api/v1/patients/{id}       # Оновити пацієнта
```

#### Лікарі:
```http
GET  /api/v1/doctors/            # Список лікарів
GET  /api/v1/doctors/{id}        # Лікар за ID  
GET  /api/v1/doctors/specializations # Спеціалізації
```

### Приклад використання API:

```javascript
// Вхід користувача
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { access_token, user } = await response.json();

// Використання токену
const userResponse = await fetch('/api/v1/users/me', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});
```

---

## 🧪 Тестування

### Backend тести:
```bash
# Запустити всі тести
make test-backend

# Або локально
cd backend
pytest

# Тести з coverage
pytest --cov=app --cov-report=html

# Запустити конкретний тест
pytest tests/test_auth.py::test_login
```

### Frontend тести:
```bash
# Запустити тести
make test-frontend

# Або локально  
cd frontend
npm test

# Тести з coverage
npm test -- --coverage --watchAll=false
```

### Інтеграційні тести:
```bash
# E2E тести з Cypress (майбутнє)
npm run cypress:open
```

### Структура тестів:
```
backend/tests/
├── 📄 conftest.py           # Pytest конфігурація
├── 📄 test_auth.py          # Тести аутентифікації  
├── 📄 test_users.py         # Тести користувачів
├── 📄 test_patients.py      # Тести пацієнтів
└── 📄 test_doctors.py       # Тести лікарів

frontend/src/tests/
├── 📄 setupTests.js         # Jest конфігурація
├── 📁 components/           # Тести компонентів
├── 📁 pages/                # Тести сторінок
└── 📁 services/             # Тести сервісів
```

---

## 🚀 Деплоймент

### Production Environment:

#### Docker Compose (простий деплой):
```bash
# Створити production .env
cp .env.example .env.production

# Відредагувати для production
nano .env.production

# Запустити production
docker-compose -f docker-compose.prod.yml up -d
```

#### Kubernetes (масштабований деплой):
```bash
# Застосувати Kubernetes конфігурації  
kubectl apply -f k8s/

# Перевірити статус
kubectl get pods
kubectl get services
```

### Environment variables:
```bash
# Production налаштування
DATABASE_URL=postgresql://user:pass@prod-db:5432/medical_db
SECRET_KEY=super-secure-production-key
DEBUG=False
ENVIRONMENT=production

# SSL та безпека
HTTPS_ONLY=True
SECURE_COOKIES=True
CORS_ORIGINS=["https://medical-ai.com"]

# Зовнішні сервіси
REDIS_URL=redis://prod-redis:6379
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

### CI/CD Pipeline (GitHub Actions):
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          # Deploy script
```

---

## 🤝 Внесок у проект

Ми віддкриті до співпраці! Ось як ви можете допомогти:

### 🐛 Повідомлення про баги:
1. Перевірте, чи немає вже такого [issue](https://github.com/your-org/medical-ai-system/issues)
2. Створіть детальний bug report з:
   - Кроками для відтворення
   - Очікуваною та фактичною поведінкою  
   - Скріншотами (якщо потрібно)
   - Інформацією про систему

### 💡 Пропозиції нових функцій:
1. Створіть [feature request](https://github.com/your-org/medical-ai-system/issues/new)
2. Опишіть детально:
   - Яка проблема вирішується
   - Запропоноване рішення
   - Альтернативні варіанти

### 🔧 Внесення коду:

#### 1. Fork та налаштування:
```bash
# Fork репозиторій на GitHub
# Клонувати ваш fork
git clone https://github.com/YOUR_USERNAME/medical-ai-system.git
cd medical-ai-system

# Додати original репозиторій
git remote add upstream https://github.com/your-org/medical-ai-system.git
```

#### 2. Створення feature branch:
```bash
git checkout develop
git pull upstream develop
git checkout -b feature/amazing-new-feature
```

#### 3. Розробка:
- Дотримуйтесь [coding standards](#coding-standards)
- Напишіть тести для нового функціоналу
- Переконайтесь, що всі тести проходять
- Оновіть документацію якщо потрібно

#### 4. Commit та push:
```bash
git add .
git commit -m "feat: add amazing new feature

- Added new patient dashboard widget
- Improved UI responsiveness  
- Added unit tests for new components

Fixes #123"

git push origin feature/amazing-new-feature
```

#### 5. Створення Pull Request:
- Відкрийте PR на GitHub
- Заповніть детальний опис змін
- Дочекайтесь code review
- Внесіть правки якщо потрібно

### Coding Standards:

#### Python (Backend):
```python
# Використовуйте Black для форматування
black .

# Перевірте якість коду
flake8 app/
mypy app/

# Імена функцій та змінних
def get_patient_by_id(patient_id: int) -> Optional[Patient]:
    """Get patient by ID with proper typing."""
    pass

# Docstrings для всіх публічних функцій
def calculate_bmi(weight: float, height: float) -> float:
    """
    Calculate Body Mass Index.
    
    Args:
        weight: Weight in kilograms
        height: Height in meters
        
    Returns:
        BMI value as float
        
    Raises:
        ValueError: If weight or height is <= 0
    """
```

#### JavaScript/React (Frontend):
```javascript
// Використовуйте Prettier для форматування  
// npm run format

// Функціональні компоненти з hooks
const PatientCard = ({ patient, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Event handlers з handle prefix
  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <Card>
      {/* JSX content */}
    </Card>
  );
};

// PropTypes або TypeScript для типізації
PatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  onEdit: PropTypes.func
};
```

---

## 👥 Команда

### 💼 Core Team:

**🎯 Product Owner**
- Управління product roadmap
- Взаємодія зі stakeholders  
- Визначення пріоритетів розвитку

**👨‍💻 Tech Lead**  
- Архітектурні рішення
- Code review та mentoring
- Технічна стратегія

**🐍 Backend Developers**
- Python/FastAPI розробка
- База даних та API
- AI/ML інтеграції

**⚛️ Frontend Developers**
- React/JavaScript