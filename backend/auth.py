from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Mock stuff for now
client = MongoClient("mongodb://localhost:27017/")
db = client["database_name"]
users_collection = db["users"]

@app.route('/user', methods=['POST'])
def user():
    pass

@app.route('/signup', methods=['POST'])
def signup():
    try:
        user_data = request.get_json()

        # Validate email and password presence
        if not user_data.get('email') or not user_data.get('password'):
            return jsonify({'error': 'No email or password provided'}), 400

        # Check if the user already exists
        if users_collection.find_one({'email': user_data['email']}):
            return jsonify({'error': 'User already exists'}), 400

        # Insert the new user into the collection
        result = users_collection.insert_one(user_data)

        # Return success message with user ID
        return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    pass

if __name__ == "__main__":
    app.run(debug=True)
