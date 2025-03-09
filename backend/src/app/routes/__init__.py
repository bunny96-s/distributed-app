from fastapi import APIRouter
from app.routes.users import router as users_router

router = APIRouter()

@router.get("/health", tags=["health"])
async def health_check():
    """
    Check if the API is running.
    """
    return {"status": "healthy"}

router.include_router(users_router)
