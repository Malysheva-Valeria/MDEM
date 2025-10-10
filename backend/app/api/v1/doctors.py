from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.doctor import Doctor
from app.models.user import User
from app.schemas.doctor import (
    DoctorCreate,
    DoctorUpdate,
    DoctorResponse,
    DoctorShort,
    DoctorPublic
)
from app.api.deps import get_current_user

router = APIRouter(prefix="/doctors", tags=["doctors"])


# Допоміжні функції

def get_doctor_by_id(doctor_id: int, db: Session) -> Doctor:
    """Отримати лікаря за ID з перевіркою існування"""
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Лікаря з ID {doctor_id} не знайдено"
        )
    return doctor


def get_doctor_by_user_id(user_id: int, db: Session) -> Doctor:
    """Отримати лікаря за user_id"""
    doctor = db.query(Doctor).filter(Doctor.user_id == user_id).first()
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Профіль лікаря не знайдено"
        )
    return doctor


# CRUD операції

@router.post("/", response_model=DoctorResponse, status_code=status.HTTP_201_CREATED)
async def create_doctor_profile(
        doctor_data: DoctorCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Створити профіль лікаря для поточного користувача

    - **Доступ**: для авторизованих користувачів з роллю лікаря
    - **Обмеження**: один профіль на користувача

    Повертає створений профіль лікаря.
    """

    # Перевірка чи вже існує профіль для цього користувача
    existing_doctor = db.query(Doctor).filter(
        Doctor.user_id == current_user.id
    ).first()

    if existing_doctor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Профіль лікаря вже існує для цього користувача"
        )

    # Перевірка унікальності номеру ліцензії
    license_exists = db.query(Doctor).filter(
        Doctor.license_number == doctor_data.license_number
    ).first()

    if license_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Лікар з таким номером ліцензії вже існує"
        )

    # Створення нового профілю лікаря
    new_doctor = Doctor(
        user_id=current_user.id,
        **doctor_data.dict()
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


@router.get("/me", response_model=DoctorResponse)
async def get_my_profile(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати профіль поточного лікаря

    - **Доступ**: тільки для авторизованих лікарів

    Повертає повну інформацію про профіль поточного користувача.
    """
    doctor = get_doctor_by_user_id(current_user.id, db)
    return doctor


@router.put("/me", response_model=DoctorResponse)
async def update_my_profile(
        doctor_data: DoctorUpdate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Оновити профіль поточного лікаря

    - **Доступ**: тільки для авторизованих лікарів
    - **Можливості**: оновлення будь-яких полів профілю

    Повертає оновлений профіль.
    """
    doctor = get_doctor_by_user_id(current_user.id, db)

    # Оновлюємо тільки ті поля, які були передані
    update_data = doctor_data.dict(exclude_unset=True)

    # Перевірка унікальності номера ліцензії якщо він змінюється
    if "license_number" in update_data and update_data["license_number"] != doctor.license_number:
        license_exists = db.query(Doctor).filter(
            Doctor.license_number == update_data["license_number"],
            Doctor.id != doctor.id
        ).first()

        if license_exists:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Лікар з таким номером ліцензії вже існує"
            )

    for field, value in update_data.items():
        setattr(doctor, field, value)

    db.commit()
    db.refresh(doctor)

    return doctor


@router.get("/{doctor_id}", response_model=DoctorPublic)
async def get_doctor(
        doctor_id: int,
        db: Session = Depends(get_db)
):
    """
    Отримати публічний профіль лікаря за ID

    - **Доступ**: публічний (не потрібна авторизація)
    - **Призначення**: для пошуку та вибору лікаря пацієнтами

    Повертає публічну інформацію про лікаря.
    """
    doctor = get_doctor_by_id(doctor_id, db)
    return doctor


@router.get("/", response_model=List[DoctorShort])
async def list_doctors(
        skip: int = 0,
        limit: int = 100,
        specialization: Optional[str] = Query(None, description="Фільтр за спеціалізацією"),
        min_rating: Optional[float] = Query(None, ge=0, le=5, description="Мінімальний рейтинг"),
        max_price: Optional[float] = Query(None, ge=0, description="Максимальна ціна консультації"),
        available_only: bool = Query(False, description="Показати тільки доступних лікарів"),
        db: Session = Depends(get_db)
):
    """
    Отримати список лікарів з фільтрами

    - **Доступ**: публічний
    - **Параметри**:
        - skip: скільки записів пропустити (для пагінації)
        - limit: максимальна кількість записів (макс 100)
        - specialization: фільтр за спеціалізацією
        - min_rating: мінімальний рейтинг
        - max_price: максимальна ціна консультації
        - available_only: показати тільки доступних лікарів

    Повертає список лікарів з короткою інформацією.
    """
    query = db.query(Doctor)

    # Застосовуємо фільтри
    if specialization:
        query = query.filter(Doctor.specialization.ilike(f"%{specialization}%"))

    if min_rating is not None:
        query = query.filter(Doctor.rating >= min_rating)

    if max_price is not None:
        query = query.filter(Doctor.consultation_price <= max_price)

    if available_only:
        query = query.filter(Doctor.is_available == True)

    # Пагінація
    doctors = query.offset(skip).limit(limit).all()

    return doctors


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_my_profile(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Видалити профіль поточного лікаря

    - **Доступ**: тільки для авторизованих лікарів
    - **Увага**: операція незворотна

    Видаляє профіль лікаря (але не акаунт користувача).
    """
    doctor = get_doctor_by_user_id(current_user.id, db)

    db.delete(doctor)
    db.commit()

    return None


# Додаткові ендпоінти

@router.get("/specializations/list", response_model=List[str])
async def get_specializations(
        db: Session = Depends(get_db)
):
    """
    Отримати список всіх спеціалізацій

    - **Доступ**: публічний

    Повертає унікальний список всіх спеціалізацій лікарів у системі.
    """
    specializations = db.query(Doctor.specialization).distinct().all()
    return [spec[0] for spec in specializations]


@router.patch("/me/availability", response_model=DoctorResponse)
async def toggle_availability(
        is_available: bool,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Змінити статус доступності лікаря

    - **Доступ**: тільки для авторизованих лікарів
    - **Використання**: швидке вмикання/вимикання можливості записатися

    Повертає оновлений профіль.
    """
    doctor = get_doctor_by_user_id(current_user.id, db)

    doctor.is_available = is_available
    db.commit()
    db.refresh(doctor)

    return doctor


@router.get("/me/statistics", response_model=dict)
async def get_my_statistics(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати статистику для поточного лікаря

    - **Доступ**: тільки для авторизованих лікарів

    Повертає статистику по прийомах, пацієнтах, рейтингу тощо.
    """
    doctor = get_doctor_by_user_id(current_user.id, db)

    # TODO: Додати реальні підрахунки з таблиць appointments та medical_records

    return {
        "doctor_id": doctor.id,
        "full_name": doctor.full_name,
        "rating": doctor.rating,
        "total_appointments": 0,  # TODO: з таблиці appointments
        "total_patients": 0,  # TODO: унікальні пацієнти
        "consultation_price": doctor.consultation_price,
        "is_available": doctor.is_available
    }


@router.get("/{doctor_id}/schedule", response_model=dict)
async def get_doctor_schedule(
        doctor_id: int,
        db: Session = Depends(get_db)
):
    """
    Отримати графік роботи лікаря

    - **Доступ**: публічний

    Повертає детальний графік роботи лікаря на тиждень.
    """
    doctor = get_doctor_by_id(doctor_id, db)

    return {
        "doctor_id": doctor.id,
        "full_name": doctor.full_name_with_title,
        "work_schedule": doctor.work_schedule,
        "consultation_duration": doctor.consultation_duration,
        "is_available": doctor.is_available
    }