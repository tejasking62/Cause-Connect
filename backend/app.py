from flask import Flask
import os
from configs.database import init_db, get_db
from auth import auth_routes

app = Flask(__name__)

# Register the auth blueprint
app.register_blueprint(auth_routes)

# Add a sample route to the main app
@app.route('/')
def home():
    return "Welcome to the Flask App!"

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))