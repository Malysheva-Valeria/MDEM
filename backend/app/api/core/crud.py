from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.api.core.security import get_password_hash, verify_password
from typing import Optional

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Отримати користувача за email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Отримати користувача за ID"""
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, email: str, password: str, first_name: str,
                last_name: str, role: str, phone: str = None) -> User:
    """Створити нового користувача"""
    hashed_password = get_password_hash(password)
    db_user = User(
        email=email,
        hashed_password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        phone=phone,  # Додали phone
        role=UserRole(role),
        is_active=True,
        is_verified=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Аутентифікувати користувача"""
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user