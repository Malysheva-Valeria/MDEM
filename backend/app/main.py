from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.config import settings
from app.database import engine
from app import models
from app.api.v1.api import api_router
from app.api.v1 import auth, users

# Створення таблиць в базі даних
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Медична система з штучним інтелектом",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Створення CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Підключення API роутерів
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(users.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "Medical AI System API",
        "version": settings.VERSION,
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )