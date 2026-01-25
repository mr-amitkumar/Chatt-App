from flask import Flask, request, jsonify
from flask_cors import CORS
# CHANGE THIS LINE: Use 'app.database' to match your folder structure
from app.database import user_manager, post_manager 

app = Flask(__name__)

# Allow React (Vite) to communicate with Flask
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# --- POST ROUTES ---

@app.route('/api/posts', methods=['GET'])
def get_all_posts_route():
    try:
        posts = post_manager.get_all_posts()
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posts', methods=['POST'])
def create_post_route():
    data = request.get_json()
    text = data.get('text')
    user_name = data.get('firstname')
    
    if not text or not user_name:
        return jsonify({"error": "Missing text or name"}), 400

    new_post = post_manager.save_to_db(text, user_name)
    if new_post:
        return jsonify(new_post), 201
    
    return jsonify({"error": "Failed to save post"}), 500

# --- AUTH ROUTES ---

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
    required = ["firstname", "email", "password"]
    
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400
    
    user_id = user_manager.check_user(data) 
    
    if user_id:
        return jsonify({"message": f"Welcome {data['firstname']}!, Account Created"}), 201
    
    return jsonify({"error": "User already exists"}), 409

if __name__ == "__main__":
    app.run(debug=True, port=8000)