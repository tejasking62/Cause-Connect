from flask import Blueprint, request, jsonify
from models import User, db
from utils import auth

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400
    
    # Create new user
    new_user = User(email=data['email'], password=auth.hash_password(data['password']))
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not auth.verify_password(data['password'], user.password):
        return jsonify({"message": "Invalid credentials"}), 401
    
    token = auth.create_access_token(user.id)
    return jsonify({"access_token": token}), 200