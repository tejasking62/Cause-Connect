from datetime import datetime, timedelta
from argon2 import PasswordHasher
from flask import request, jsonify, g
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
from sqlalchemy.orm import Session
from .. import models, schemas
from ..configs import database

# Initialize PasswordHasher and JWT manager
password_hasher = PasswordHasher()
jwt = JWTManager()

# Constants
ACCESS_TOKEN_EXPIRE_MINUTES = 900
ALGORITHM = "HS256"
SECRET_KEY = "ofYNA3mE1p2GDLetPU3tvuemWPXsBa8R"

def hash(password: str):
    return password_hasher.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return password_hasher.verify(hashed_password, plain_password)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})

    encoded_jwt = create_access_token(identity=data)
    return encoded_jwt

def get_current_user(db: Session = database.get_db()):
    user_id = get_jwt_identity()  # Get the user ID from the JWT
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        return None  # or raise an exception
    return user