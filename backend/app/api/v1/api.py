"""
Головний роутер API v1
Об'єднує всі endpoint роутери в одному місці
"""

from fastapi import APIRouter
from app.api.v1 import auth, patients, doctors

# Створення головного роутеру
api_router = APIRouter()

# Підключення всіх роутерів
api_router.include_router(
    auth.router,
    tags=["authentication"]
)

api_router.include_router(
    patients.router,
    tags=["patients"]
)

api_router.include_router(
    doctors.router,
    tags=["doctors"]
)