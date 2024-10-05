from flask import Flask, request, jsonify
from sqlalchemy.orm import Session
from .configs.database import get_db
from .. import models
from .. import schemas
import uuid
import datetime
from .utils import auth

app = Flask(__name__)

@app.route('/user', methods=['GET'])
def get_user():
    db: Session = get_db()
    current_user = auth.get_current_user()
    return jsonify(current_user)

@app.route('/signup', methods=['POST'])
def signup():
    db: Session = get_db()
    user_data = request.get_json()
    user = schemas.UserCreate(**user_data)

    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        if existing_user.verified:
            return jsonify({"msg": "User with this email already exists"}), 409
        else:
            # Resend OTP logic removed
            pass

    # Create new user object
    new_user = models.User(
        email=user.email,
        password=auth.hash(user.password),
        first_name=user.first_name,
        last_name=user.last_name,
        verified=False,  # Set to false initially
        verification_code=None,  # No verification code needed
        verification_code_timestamp=None  # No timestamp needed
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # Refresh to get the new user's ID and other auto-generated fields

    return jsonify(new_user), 201

@app.route('/login', methods=['POST'])
def login():
    db: Session = get_db()
    user_login = request.form
    username = user_login['username']
    password = user_login['password']

    # Retrieve the user by email
    user = db.query(models.User).filter(models.User.email == username).first()
    if not user:
        return jsonify({"detail": "Invalid Credentials"}), 401

    # Verify the user's password
    if not auth.verify_password(password, user.password):
        return jsonify({"detail": "Invalid Credentials"}), 401

    # Create an access token
    access_token = auth.create_access_token(data={"user_id": str(user.id)})

    user_details = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }

    response_data = {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_details,
    }

    return jsonify(response_data)


