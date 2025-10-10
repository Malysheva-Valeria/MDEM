from pydantic import BaseModel, EmailStr, Field, validator
from datetime import date
from typing import Optional, List, Dict
from app.models.patient import BloodType, Gender


# Допоміжні схеми для медикаментів

class MedicationItem(BaseModel):
    """Схема для одного медикаменту"""
    name: str = Field(..., min_length=1, max_length=200)
    dosage: str = Field(..., min_length=1, max_length=100)
    frequency: Optional[str] = Field(None, max_length=100)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Аспірін",
                "dosage": "100мг",
                "frequency": "1 раз на день"
            }
        }


# Базові схеми

class PatientBase(BaseModel):
    """Базова схема пацієнта (загальні поля)"""
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    date_of_birth: date
    gender: Gender
    phone: str = Field(..., min_length=10, max_length=20)
    email: EmailStr
    address: Optional[str] = None
    emergency_contact: Optional[str] = Field(None, max_length=255)


class PatientMedicalInfo(BaseModel):
    """Медична інформація пацієнта"""
    blood_type: Optional[BloodType] = None
    allergies: List[str] = Field(default_factory=list)
    chronic_diseases: List[str] = Field(default_factory=list)
    current_medications: List[MedicationItem] = Field(default_factory=list)
    insurance_number: Optional[str] = Field(None, max_length=50)
    medical_notes: Optional[str] = None

    @validator('allergies', 'chronic_diseases')
    def validate_list_items(cls, v):
        """Перевірка що елементи списку не порожні"""
        if v:
            return [item.strip() for item in v if item and item.strip()]
        return []


# Схеми для створення

class PatientCreate(PatientBase, PatientMedicalInfo):
    """
    Схема для створення нового пацієнта
    Включає всі необхідні поля
    """

    @validator('date_of_birth')
    def validate_age(cls, v):
        """Перевірка що вік пацієнта коректний"""
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))

        if age < 0:
            raise ValueError('Дата народження не може бути в майбутньому')
        if age > 150:
            raise ValueError('Некоректна дата народження')
        if age < 16:
            raise ValueError('Пацієнт повинен бути старше 16 років')

        return v

    @validator('phone')
    def validate_phone(cls, v):
        """Базова валідація телефону"""
        # Прибираємо всі нецифрові символи
        digits = ''.join(filter(str.isdigit, v))
        if len(digits) < 10:
            raise ValueError('Телефон повинен містити мінімум 10 цифр')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "first_name": "Іван",
                "last_name": "Петренко",
                "middle_name": "Миколайович",
                "date_of_birth": "1990-05-15",
                "gender": "male",
                "phone": "+380501234567",
                "email": "ivan.petrenko@example.com",
                "address": "вул. Хрещатик, 1, Київ",
                "emergency_contact": "Марія Петренко: +380501234568",
                "blood_type": "A+",
                "allergies": ["Пеніцилін", "Котяча шерсть"],
                "chronic_diseases": ["Гіпертонія"],
                "current_medications": [
                    {
                        "name": "Еналаприл",
                        "dosage": "10мг",
                        "frequency": "1 раз на день"
                    }
                ],
                "insurance_number": "123456789",
                "medical_notes": "Загальний стан здоров'я задовільний"
            }
        }


# Схеми для оновлення

class PatientUpdate(BaseModel):
    """
    Схема для оновлення даних пацієнта
    Всі поля опціональні
    """
    first_name: Optional[str] = Field(None, min_length=2, max_length=100)
    last_name: Optional[str] = Field(None, min_length=2, max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = Field(None, max_length=255)
    blood_type: Optional[BloodType] = None
    allergies: Optional[List[str]] = None
    chronic_diseases: Optional[List[str]] = None
    current_medications: Optional[List[MedicationItem]] = None
    insurance_number: Optional[str] = Field(None, max_length=50)
    medical_notes: Optional[str] = None

    @validator('date_of_birth')
    def validate_age(cls, v):
        if v is None:
            return v
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))

        if age < 0:
            raise ValueError('Дата народження не може бути в майбутньому')
        if age > 150:
            raise ValueError('Некоректна дата народження')
        if age < 16:
            raise ValueError('Пацієнт повинен бути старше 16 років')

        return v


# Схеми для відповіді

class PatientResponse(PatientBase, PatientMedicalInfo):
    """
    Схема для відповіді з даними пацієнта
    Включає ID та обчислені поля
    """
    id: int
    user_id: int
    age: int
    full_name: str

    class Config:
        from_attributes = True  # Для Pydantic v2 (замість orm_mode)


class PatientShort(BaseModel):
    """
    Коротка інформація про пацієнта
    Для списків та швидкого перегляду
    """
    id: int
    full_name: str
    age: int
    gender: Gender
    phone: str
    email: EmailStr

    class Config:
        from_attributes = True