from datetime import datetime
from sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)  # Added 'name' field
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(120), nullable=False, default='User')  # 'role' field with a default value
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)

    # Relationship to NonprofitApplied
    applications = db.relationship('NonprofitApplied', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class NonprofitApplied(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    sectors = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Added date_posted field

    def __repr__(self):
        return f"NonprofitApplied('{self.title}', '{self.date_posted}')"
