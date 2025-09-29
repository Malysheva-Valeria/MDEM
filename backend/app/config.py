from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "Medical AI System"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Значення за замовчуванням для розробки
    SECRET_KEY: str = "development-secret-key-change-in-production-min-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/mdem"
    TEST_DATABASE_URL: Optional[str] = None

    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    DEBUG: bool = True

    UPLOAD_FOLDER: str = "./uploads"
    MAX_FILE_SIZE: int = 10485760

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()