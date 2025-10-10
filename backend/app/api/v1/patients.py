from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.patient import Patient
from app.models.user import User
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientResponse,
    PatientShort
)

from app.api.deps import get_current_user

router = APIRouter(prefix="/patients", tags=["patients"])


# Допоміжні функції

def get_patient_by_id(patient_id: int, db: Session) -> Patient:
    """Отримати пацієнта за ID з перевіркою існування"""
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Пацієнта з ID {patient_id} не знайдено"
        )
    return patient


def get_patient_by_user_id(user_id: int, db: Session) -> Patient:
    """Отримати пацієнта за user_id"""
    patient = db.query(Patient).filter(Patient.user_id == user_id).first()
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Профіль пацієнта не знайдено"
        )
    return patient


# CRUD операції

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient_profile(
        patient_data: PatientCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Створити профіль пацієнта для поточного користувача

    - **Доступ**: тільки для авторизованих користувачів
    - **Обмеження**: один профіль на користувача

    Повертає створений профіль пацієнта.
    """

    # Перевірка чи вже існує профіль для цього користувача
    existing_patient = db.query(Patient).filter(
        Patient.user_id == current_user.id
    ).first()

    if existing_patient:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Профіль пацієнта вже існує для цього користувача"
        )

    # Перевірка унікальності email
    email_exists = db.query(Patient).filter(
        Patient.email == patient_data.email
    ).first()

    if email_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пацієнт з таким email вже існує"
        )

    # Створення нового профілю пацієнта
    new_patient = Patient(
        user_id=current_user.id,
        **patient_data.dict()
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient


@router.get("/me", response_model=PatientResponse)
async def get_my_profile(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати профіль поточного пацієнта

    - **Доступ**: тільки для авторизованих пацієнтів

    Повертає повну інформацію про профіль поточного користувача.
    """
    patient = get_patient_by_user_id(current_user.id, db)
    return patient


@router.put("/me", response_model=PatientResponse)
async def update_my_profile(
        patient_data: PatientUpdate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Оновити профіль поточного пацієнта

    - **Доступ**: тільки для авторизованих пацієнтів
    - **Можливості**: оновлення будь-яких полів профілю

    Повертає оновлений профіль.
    """
    patient = get_patient_by_user_id(current_user.id, db)

    # Оновлюємо тільки ті поля, які були передані
    update_data = patient_data.dict(exclude_unset=True)

    # Перевірка унікальності email якщо він змінюється
    if "email" in update_data and update_data["email"] != patient.email:
        email_exists = db.query(Patient).filter(
            Patient.email == update_data["email"],
            Patient.id != patient.id
        ).first()

        if email_exists:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пацієнт з таким email вже існує"
            )

    for field, value in update_data.items():
        setattr(patient, field, value)

    db.commit()
    db.refresh(patient)

    return patient


@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(
        patient_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати профіль пацієнта за ID

    - **Доступ**: для лікарів та адміністраторів
    - **Обмеження**: пацієнти можуть бачити тільки свій профіль

    Повертає повну інформацію про пацієнта.
    """
    patient = get_patient_by_id(patient_id, db)

    # Перевірка прав доступу
    # TODO: Додати логіку перевірки ролі користувача
    # Наразі дозволяємо тільки власний профіль
    if patient.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Немає доступу до цього профілю"
        )

    return patient


@router.get("/", response_model=List[PatientShort])
async def list_patients(
        skip: int = 0,
        limit: int = 100,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати список пацієнтів

    - **Доступ**: тільки для лікарів та адміністраторів
    - **Параметри**:
        - skip: скільки записів пропустити (для пагінації)
        - limit: максимальна кількість записів (макс 100)

    Повертає список пацієнтів з короткою інформацією.
    """
    # TODO: Додати перевірку ролі (тільки лікарі та адміни)
    # TODO: Лікарі повинні бачити тільки своїх пацієнтів

    patients = db.query(Patient).offset(skip).limit(limit).all()
    return patients


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_my_profile(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Видалити профіль поточного пацієнта

    - **Доступ**: тільки для авторизованих пацієнтів
    - **Увага**: операція незворотна

    Видаляє профіль пацієнта (але не акаунт користувача).
    """
    patient = get_patient_by_user_id(current_user.id, db)

    db.delete(patient)
    db.commit()

    return None


# Додаткові ендпоінти

@router.get("/me/medical-summary", response_model=dict)
async def get_medical_summary(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    """
    Отримати медичне резюме пацієнта

    Повертає стислу медичну інформацію для швидкого огляду.
    """
    patient = get_patient_by_user_id(current_user.id, db)

    return {
        "patient_id": patient.id,
        "full_name": patient.full_name,
        "age": patient.age,
        "blood_type": patient.blood_type,
        "allergies_count": len(patient.allergies) if patient.allergies else 0,
        "chronic_diseases_count": len(patient.chronic_diseases) if patient.chronic_diseases else 0,
        "current_medications_count": len(patient.current_medications) if patient.current_medications else 0,
        "has_insurance": bool(patient.insurance_number)
    }