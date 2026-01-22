from flask import Flask, request, jsonify
from flask_cors import CORS
from app.database import user_manager

app = Flask(__name__)

# Allow React (Vite) to communicate with Flask
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/Login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Please provide both email and password"}), 400
    
    user = user_manager.get_user(email, password)

    if user:
        return jsonify({
            "message": "Login Successful",
            "user": user,
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.get_json()

    # FIX: Changed "fullname" to "firstname" to match React state
    required = ["firstname", "email", "password"]
    
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400
    
    # check_user handles the logic of checking existence and inserting
    user_id = user_manager.check_user(data) 
    
    if user_id:
        return jsonify({"message": f"Welcome {data['firstname']}!, Account Created"}), 201
    
    return jsonify({"error": "User already exists"}), 409

if __name__ == "__main__":
    app.run(debug=True, port=8000)