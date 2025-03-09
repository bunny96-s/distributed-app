from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.models import User
from app.models.schemas import UserCreate
from fastapi import HTTPException

class UserService:
    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")
        return user

    @staticmethod
    def get_user_by_username(db: Session, username: str):
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        try:
            # Check if username already exists
            existing_username = UserService.get_user_by_username(db, user.username)
            if existing_username:
                raise HTTPException(status_code=400, detail="Username already registered")
            
            # Check if email already exists
            existing_email = UserService.get_user_by_email(db, user.email)
            if existing_email:
                raise HTTPException(status_code=400, detail="Email already registered")
            
            db_user = User(username=user.username, email=user.email)
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Could not create user due to database constraint")
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")