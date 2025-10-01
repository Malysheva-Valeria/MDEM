from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Professional Information
    specialization = Column(String, nullable=False, index=True)  # додав index для пошуку
    license_number = Column(String, unique=True, nullable=False, index=True)
    education = Column(Text, nullable=True)
    experience_years = Column(Integer, nullable=True)

    # Practice Information
    clinic_name = Column(String, nullable=True)
    clinic_address = Column(String, nullable=True)
    consultation_fee = Column(Integer, nullable=True)  # In cents

    # Schedule - JSON для гнучкості
    working_hours = Column(JSON, nullable=True)  # {"monday": ["09:00-13:00", "14:00-18:00"]}
    available_days = Column(JSON, nullable=True)  # ["monday", "tuesday", "wednesday"]

    # Verification
    is_verified = Column(Boolean, default=False)
    verification_date = Column(DateTime(timezone=True), nullable=True)

    # Statistics
    rating = Column(Integer, default=0)  # Average rating * 100 (e.g., 450 = 4.5 stars)
    total_reviews = Column(Integer, default=0)
    total_patients = Column(Integer, default=0)

    # Timestamps - додав для відстеження
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="doctor_profile")
    appointments = relationship("Appointment", back_populates="doctor", cascade="all, delete-orphan")
    medical_records = relationship("MedicalRecord", back_populates="doctor", cascade="all, delete-orphan")

    @property
    def average_rating(self):
        """Повертає рейтинг у форматі float (наприклад, 4.5)"""
        return self.rating / 100 if self.rating else 0.0

    def __repr__(self):
        return f"<Doctor(license={self.license_number}, specialization='{self.specialization}')>"