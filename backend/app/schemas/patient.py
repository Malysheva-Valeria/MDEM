from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from app.models.patient import Gender, BloodType


class PatientBase(BaseModel):
    birth_date: Optional[date] = None
    gender: Optional[Gender] = None
    blood_type: Optional[BloodType] = None
    address: Optional[str] = None
    city: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None


class PatientCreate(PatientBase):
    # Для JSON полів
    allergies: Optional[List[str]] = None
    chronic_conditions: Optional[List[str]] = None
    current_medications: Optional[List[dict]] = None
    insurance_number: Optional[str] = None


class PatientUpdate(PatientBase):
    allergies: Optional[List[str]] = None
    chronic_conditions: Optional[List[str]] = None
    current_medications: Optional[List[dict]] = None
    insurance_number: Optional[str] = None


class PatientResponse(PatientBase):
    id: int
    user_id: int
    allergies: Optional[List[str]] = None
    chronic_conditions: Optional[List[str]] = None
    current_medications: Optional[List[dict]] = None
    insurance_number: Optional[str] = None

    class Config:
        from_attributes = True