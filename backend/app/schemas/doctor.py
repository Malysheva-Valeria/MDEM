from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import time


# Допоміжні схеми

class EducationItem(BaseModel):
    """Схема для освіти"""
    institution: str = Field(..., min_length=3, max_length=200)
    degree: str = Field(..., min_length=3, max_length=100)
    year: int = Field(..., ge=1950, le=2100)

    class Config:
        json_schema_extra = {
            "example": {
                "institution": "Національний медичний університет",
                "degree": "Магістр медицини",
                "year": 2015
            }
        }


class WorkScheduleDay(BaseModel):
    """Схема для одного дня графіку роботи"""
    start: str = Field(..., pattern=r'^([01]\d|2[0-3]):([0-5]\d)$')
    end: str = Field(..., pattern=r'^([01]\d|2[0-3]):([0-5]\d)$')

    @validator('end')
    def validate_time_range(cls, v, values):
        """Перевірка що час закінчення пізніше за час початку"""
        if 'start' in values:
            start_h, start_m = map(int, values['start'].split(':'))
            end_h, end_m = map(int, v.split(':'))

            start_minutes = start_h * 60 + start_m
            end_minutes = end_h * 60 + end_m

            if end_minutes <= start_minutes:
                raise ValueError('Час закінчення роботи має бути пізніше за час початку')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "start": "09:00",
                "end": "18:00"
            }
        }


# Базові схеми

class DoctorBase(BaseModel):
    """Базова схема лікаря (загальні поля)"""
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    specialization: str = Field(..., min_length=3, max_length=100)
    license_number: str = Field(..., min_length=5, max_length=50)
    consultation_price: float = Field(..., ge=0, le=100000)
    bio: Optional[str] = Field(None, max_length=2000)


class DoctorProfessionalInfo(BaseModel):
    """Професійна інформація лікаря"""
    education: List[EducationItem] = Field(default_factory=list)
    experience_years: int = Field(default=0, ge=0, le=70)
    languages: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)
    work_schedule: Dict[str, WorkScheduleDay] = Field(default_factory=dict)
    is_available: bool = Field(default=True)

    @validator('languages', 'certifications', 'achievements')
    def validate_list_items(cls, v):
        """Перевірка що елементи списку не порожні"""
        if v:
            return [item.strip() for item in v if item and item.strip()]
        return []

    @validator('work_schedule')
    def validate_schedule(cls, v):
        """Валідація графіку роботи"""
        valid_days = {'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'}

        if v:
            invalid_days = set(v.keys()) - valid_days
            if invalid_days:
                raise ValueError(f'Некоректні дні тижня: {invalid_days}')

        return v


# Схеми для створення

class DoctorCreate(DoctorBase, DoctorProfessionalInfo):
    """
    Схема для створення нового лікаря
    Включає всі необхідні поля
    """

    @validator('license_number')
    def validate_license(cls, v):
        """Базова валідація номеру ліцензії"""
        # Прибираємо пробіли та дефіси
        cleaned = v.replace(' ', '').replace('-', '')
        if len(cleaned) < 5:
            raise ValueError('Номер ліцензії занадто короткий')
        return v

    @validator('experience_years')
    def validate_experience(cls, v):
        """Валідація років досвіду"""
        if v < 0:
            raise ValueError('Роки досвіду не можуть бути від\'ємними')
        if v > 70:
            raise ValueError('Роки досвіду не можуть перевищувати 70')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "first_name": "Олена",
                "last_name": "Коваленко",
                "middle_name": "Сергіївна",
                "specialization": "Терапевт",
                "license_number": "MD-12345",
                "consultation_price": 500.0,
                "bio": "Досвідчений терапевт з 15-річним стажем",
                "education": [
                    {
                        "institution": "Національний медичний університет",
                        "degree": "Магістр медицини",
                        "year": 2008
                    }
                ],
                "experience_years": 15,
                "languages": ["Українська", "Англійська"],
                "certifications": ["Сертифікат терапевта"],
                "achievements": ["Лікар року 2020"],
                "work_schedule": {
                    "monday": {"start": "09:00", "end": "18:00"},
                    "tuesday": {"start": "09:00", "end": "18:00"},
                    "wednesday": {"start": "09:00", "end": "18:00"},
                    "thursday": {"start": "09:00", "end": "18:00"},
                    "friday": {"start": "09:00", "end": "17:00"}
                },
                "is_available": True
            }
        }


# Схеми для оновлення

class DoctorUpdate(BaseModel):
    """
    Схема для оновлення даних лікаря
    Всі поля опціональні
    """
    first_name: Optional[str] = Field(None, min_length=2, max_length=100)
    last_name: Optional[str] = Field(None, min_length=2, max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    specialization: Optional[str] = Field(None, min_length=3, max_length=100)
    consultation_price: Optional[float] = Field(None, ge=0, le=100000)
    bio: Optional[str] = Field(None, max_length=2000)
    education: Optional[List[EducationItem]] = None
    experience_years: Optional[int] = Field(None, ge=0, le=70)
    languages: Optional[List[str]] = None
    certifications: Optional[List[str]] = None
    achievements: Optional[List[str]] = None
    work_schedule: Optional[Dict[str, WorkScheduleDay]] = None
    is_available: Optional[bool] = None
    rating: Optional[float] = Field(None, ge=0, le=5)

    @validator('experience_years')
    def validate_experience(cls, v):
        if v is not None and (v < 0 or v > 70):
            raise ValueError('Роки досвіду мають бути від 0 до 70')
        return v


# Схеми для відповіді

class DoctorResponse(DoctorBase, DoctorProfessionalInfo):
    """
    Схема для відповіді з даними лікаря
    Включає ID та обчислені поля
    """
    id: int
    user_id: int
    rating: float
    full_name: str
    full_name_with_title: str
    consultation_duration: int

    class Config:
        from_attributes = True


class DoctorShort(BaseModel):
    """
    Коротка інформація про лікаря
    Для списків та швидкого перегляду
    """
    id: int
    full_name_with_title: str
    specialization: str
    experience_years: int
    consultation_price: float
    rating: float
    is_available: bool

    class Config:
        from_attributes = True


class DoctorPublic(BaseModel):
    """
    Публічна інформація про лікаря
    Для незареєстрованих користувачів
    """
    id: int
    full_name_with_title: str
    specialization: str
    bio: Optional[str]
    experience_years: int
    rating: float
    consultation_price: float
    languages: List[str]
    is_available: bool

    class Config:
        from_attributes = True