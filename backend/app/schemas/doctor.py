from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime


class DoctorBase(BaseModel):
    specialization: str
    license_number: str
    education: Optional[str] = None
    experience_years: Optional[int] = None
    clinic_name: Optional[str] = None
    clinic_address: Optional[str] = None
    consultation_fee: Optional[int] = None


class DoctorCreate(DoctorBase):
    working_hours: Optional[Dict[str, List[str]]] = None
    available_days: Optional[List[str]] = None


class DoctorUpdate(BaseModel):
    education: Optional[str] = None
    experience_years: Optional[int] = None
    clinic_name: Optional[str] = None
    clinic_address: Optional[str] = None
    consultation_fee: Optional[int] = None
    working_hours: Optional[Dict[str, List[str]]] = None
    available_days: Optional[List[str]] = None


class DoctorResponse(DoctorBase):
    id: int
    user_id: int
    is_verified: bool
    verification_date: Optional[datetime] = None
    rating: int
    total_reviews: int
    total_patients: int
    working_hours: Optional[Dict[str, List[str]]] = None
    available_days: Optional[List[str]] = None

    class Config:
        from_attributes = True