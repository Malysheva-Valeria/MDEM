from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import date
import enum

from app.database import Base


class BloodType(str, enum.Enum):
    """Групи крові"""
    A_POSITIVE = "A+"
    A_NEGATIVE = "A-"
    B_POSITIVE = "B+"
    B_NEGATIVE = "B-"
    AB_POSITIVE = "AB+"
    AB_NEGATIVE = "AB-"
    O_POSITIVE = "O+"
    O_NEGATIVE = "O-"


class Gender(str, enum.Enum):
    """Стать"""
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class Patient(Base):
    """Модель пацієнта з повною медичною інформацією"""
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Особисті дані
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(Enum(Gender), nullable=False)

    # Контактна інформація
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(Text, nullable=True)
    emergency_contact = Column(String(255), nullable=True)

    # Медична інформація
    blood_type = Column(Enum(BloodType), nullable=True)
    allergies = Column(JSON, default=list)
    chronic_diseases = Column(JSON, default=list)
    current_medications = Column(JSON, default=list)

    # Страхування
    insurance_number = Column(String(50), nullable=True)

    # Додаткова інформація
    medical_notes = Column(Text, nullable=True)

    # Зв'язки з іншими таблицями
    user = relationship("User", back_populates="patient")

    def __repr__(self):
        return f"<Patient {self.first_name} {self.last_name}>"

    @property
    def full_name(self):
        """Повне ім'я пацієнта"""
        parts = [self.last_name, self.first_name]
        if self.middle_name:
            parts.append(self.middle_name)
        return " ".join(parts)

    @property
    def age(self):
        """Вік пацієнта"""
        today = date.today()
        return today.year - self.date_of_birth.year - (
                (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )