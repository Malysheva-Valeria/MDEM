from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.core.security import create_access_token
from app.api.core.crud import authenticate_user, create_user, get_user_by_email
from app.api.deps import get_current_active_user
from app.schemas.auth import UserCreate, UserLogin, Token, UserResponse
from app.models.user import User
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Реєстрація нового користувача (загальний endpoint)"""
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    user = create_user(
        db=db,
        email=user_data.email,
        password=user_data.password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        role=user_data.role.value
    )

    # Створити токен одразу після реєстрації
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )

    # Повернути користувача з токеном
    return {
        **UserResponse.from_orm(user).dict(),
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/register/patient", response_model=dict, status_code=status.HTTP_201_CREATED)
def register_patient(user_data: UserCreate, db: Session = Depends(get_db)):
    """Реєстрація нового пацієнта"""
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Примусово встановити роль patient
    user = create_user(
        db=db,
        email=user_data.email,
        password=user_data.password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone if hasattr(user_data, 'phone') else None,
        role="patient"  # Завжди patient
    )

    # Створити токен
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )

    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone": user.phone,
        "role": user.role.value,
        "is_active": user.is_active,
        "created_at": user.created_at,
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/register/doctor", response_model=dict, status_code=status.HTTP_201_CREATED)
def register_doctor(user_data: UserCreate, db: Session = Depends(get_db)):
    """Реєстрація нового лікаря"""
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Примусово встановити роль doctor
    user = create_user(
        db=db,
        email=user_data.email,
        password=user_data.password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone if hasattr(user_data, 'phone') else None,
        role="doctor"  # Завжди doctor
    )

    # Створити токен
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )

    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone": user.phone,
        "role": user.role.value,
        "is_active": user.is_active,
        "created_at": user.created_at,
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Вхід користувача"""
    user = authenticate_user(db, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Отримати інформацію про поточного користувача"""
    return current_user