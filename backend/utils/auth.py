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



