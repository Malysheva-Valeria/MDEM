from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.api.core.security import verify_token
from app.api.core.crud import get_user_by_email
from app.models.user import User, UserRole

security = HTTPBearer()


def get_current_user(
        db: Session = Depends(get_db),
        credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    """Отримати поточного користувача з JWT токену"""
    payload = verify_token(credentials.credentials)
    email = payload.get("sub")

    user = get_user_by_email(db, email=email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )

    return user


def get_current_active_user(
        current_user: User = Depends(get_current_user)
) -> User:
    """Отримати активного користувача"""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user


def require_role(required_role: UserRole):
    """Dependency для перевірки ролі користувача"""

    def role_checker(current_user: User = Depends(get_current_active_user)):
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user

    return role_checker


# Конкретні ролі
def get_current_patient(
        current_user: User = Depends(require_role(UserRole.PATIENT))
) -> User:
    """Тільки для пацієнтів"""
    return current_user


def get_current_doctor(
        current_user: User = Depends(require_role(UserRole.DOCTOR))
) -> User:
    """Тільки для лікарів"""
    return current_user


def get_current_admin(
        current_user: User = Depends(require_role(UserRole.ADMIN))
) -> User:
    """Тільки для адміністраторів"""
    return current_user


def get_current_super_admin(
        current_user: User = Depends(require_role(UserRole.SUPER_ADMIN))
) -> User:
    """Тільки для супер-адміністраторів"""
    return current_user
