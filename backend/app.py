from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from models import db, User, Nonprofit
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
bcrypt = Bcrypt(app)

# Initialize database
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    email = data.get('email')
    is_nonprofit = data.get('is_nonprofit', False)
    user_data = data.get('data', {})

    if not username or not password or not name or not email:
        return jsonify({"error": "Username, password, name, and email are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        new_user = User(username=username, password=hashed_password, name=name, email=email, 
                        is_nonprofit=is_nonprofit, data=user_data)
        db.session.add(new_user)
        
        if is_nonprofit:
            nonprofit_data = data.get('nonprofit', {})
            if not nonprofit_data.get('title') or not nonprofit_data.get('location') or not nonprofit_data.get('sectors'):
                return jsonify({"error": "Nonprofit title, location, and sectors are required"}), 400
            
            new_nonprofit = Nonprofit(
                user=new_user,
                title=nonprofit_data['title'],
                location=nonprofit_data['location'],
                sectors=nonprofit_data['sectors'],
                content=nonprofit_data.get('content', '')
            )
            db.session.add(new_nonprofit)
        
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Username or email already exists"}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/user/<int:user_id>/data', methods=['POST'])
def update_user_data(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        user.data = data
        db.session.commit()
        return jsonify({"message": "User data updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)