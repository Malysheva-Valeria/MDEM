from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
import enum
from app.database import Base


class Gender(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class BloodType(enum.Enum):
    A_POSITIVE = "A+"
    A_NEGATIVE = "A-"
    B_POSITIVE = "B+"
    B_NEGATIVE = "B-"
    AB_POSITIVE = "AB+"
    AB_NEGATIVE = "AB-"
    O_POSITIVE = "O+"
    O_NEGATIVE = "O-"


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Personal Information
    birth_date = Column(Date, nullable=True)
    gender = Column(Enum(Gender), nullable=True)
    blood_type = Column(Enum(BloodType), nullable=True)

    # Contact Information
    address = Column(String, nullable=True)
    city = Column(String, nullable=True)
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)

    # Medical Information - краще JSON для структурованості
    allergies = Column(JSON, nullable=True)  # ["Penicillin", "Peanuts"]
    chronic_conditions = Column(JSON, nullable=True)  # ["Diabetes Type 2", "Hypertension"]
    current_medications = Column(JSON, nullable=True)  # [{"name": "Metformin", "dosage": "500mg"}]
    insurance_number = Column(String, nullable=True)

    # Relationships
    user = relationship("User", back_populates="patient_profile")
    #medical_records = relationship("MedicalRecord", back_populates="patient", cascade="all, delete-orphan")
    #appointments = relationship("Appointment", back_populates="patient", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Patient(user_id={self.user_id})>"