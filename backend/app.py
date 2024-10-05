from flask import Flask, jsonify
import os
from models import db, User, Nonprofits
from auth import auth_routes

app = Flask(__name__)

# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///./app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db.init_app(app)

# Register the auth blueprint
app.register_blueprint(auth_routes)

@app.route('/')
def home():
    return "Welcome to the Flask App!"

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test successful"}), 200

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify(error=str(e)), 405

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)