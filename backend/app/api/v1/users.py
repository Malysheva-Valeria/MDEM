from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_active_user
from app.schemas.auth import UserResponse
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_current_user(current_user: User = Depends(get_current_active_user)):
    """Отримати інформацію про поточного користувача"""
    return current_user


@router.put("/me", response_model=UserResponse)
def update_current_user(
        user_data: dict,
        current_user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    """Оновити профіль поточного користувача"""
    # Оновити дозволені поля
    if "first_name" in user_data:
        current_user.first_name = user_data["first_name"]
    if "last_name" in user_data:
        current_user.last_name = user_data["last_name"]
    if "phone" in user_data:
        current_user.phone = user_data["phone"]

    db.commit()
    db.refresh(current_user)

    return current_user

