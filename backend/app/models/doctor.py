from sqlalchemy import Column, Integer, String, ForeignKey, Text, Float, Boolean, JSON
from sqlalchemy.orm import relationship

from app.database import Base


class Doctor(Base):
    """Модель лікаря з професійною інформацією"""
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Особисті дані
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)

    # Професійна інформація
    specialization = Column(String(100), nullable=False, index=True)
    license_number = Column(String(50), unique=True, nullable=False)
    education = Column(JSON, default=list)
    experience_years = Column(Integer, default=0)

    # Опис та рейтинг
    bio = Column(Text, nullable=True)
    consultation_price = Column(Float, nullable=False)
    rating = Column(Float, default=5.0)

    # Доступність
    is_available = Column(Boolean, default=True)

    # Мови та графік
    languages = Column(JSON, default=list)
    work_schedule = Column(JSON, default=dict)

    # Додаткова інформація
    certifications = Column(JSON, default=list)
    achievements = Column(JSON, default=list)

    # Зв'язки з іншими таблицями
    user = relationship("User", back_populates="doctor")

    def __repr__(self):
        return f"<Doctor {self.full_name} - {self.specialization}>"

    @property
    def full_name(self):
        """Повне ім'я лікаря"""
        parts = [self.last_name, self.first_name]
        if self.middle_name:
            parts.append(self.middle_name)
        return " ".join(parts)

    @property
    def full_name_with_title(self):
        """Повне ім'я з професійним титулом"""
        return f"Лікар {self.full_name}"

    @property
    def consultation_duration(self):
        """Стандартна тривалість консультації (в хвилинах)"""
        return 30