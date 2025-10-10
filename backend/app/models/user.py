from sqlalchemy import Boolean, Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.database import Base


class UserRole(str, enum.Enum):
    """Ролі користувачів у системі"""
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"


class User(Base):
    """
    Модель користувача системи

    Attributes:
        id: Унікальний ідентифікатор
        email: Email для входу (унікальний)
        hashed_password: Захешований пароль
        first_name: Ім'я
        last_name: Прізвище
        phone: Телефон (опціонально)
        role: Роль користувача (patient, doctor, admin)
        is_active: Чи активний акаунт
        is_verified: Чи підтверджений email
        created_at: Дата створення
        updated_at: Дата останнього оновлення
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Особисті дані
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    # Роль та статус
    role = Column(Enum(UserRole), nullable=False, index=True)
    is_active = Column(Boolean, default=True, index=True)
    is_verified = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships (зв'язки з іншими таблицями)
    patient = relationship("Patient", back_populates="user", uselist=False, cascade="all, delete-orphan")
    doctor = relationship("Doctor", back_populates="user", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.email} ({self.role})>"

    @property
    def full_name(self):
        """Повне ім'я користувача"""
        return f"{self.first_name} {self.last_name}"