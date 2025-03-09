from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.schemas import UserCreate, UserResponse, ErrorResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserResponse], responses={500: {"model": ErrorResponse}})
async def get_users(
    skip: int = Query(0, ge=0, description="Skip the first N users"),
    limit: int = Query(100, ge=1, le=100, description="Limit the number of users returned"),
    db: Session = Depends(get_db)
):
    """
    Retrieve all users with pagination.
    """
    try:
        users = UserService.get_users(db, skip=skip, limit=limit)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=UserResponse, responses={404: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a user by ID.
    """
    return UserService.get_user_by_id(db, user_id)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED, 
          responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.
    """
    return UserService.create_user(db, user)