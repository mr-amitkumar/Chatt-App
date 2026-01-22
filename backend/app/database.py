import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

# Load variables from .env file
load_dotenv()

# 1. Setup the SSL certificate bundle path using certifi
ca = certifi.where()

# 2. Connection Configuration
# We use tlsCAFile and retry parameters to ensure a stable connection
try:
    client = MongoClient(
        os.getenv("MONGO_DETAILS"),
        tls=True,
        tlsCAFile=ca,
        retryWrites=True,           # Automatically retry failed write operations
        retryReads=True,            # Automatically retry failed read operations
        connectTimeoutMS=30000,     # 30 seconds to establish initial connection
        serverSelectionTimeoutMS=5000 # Wait 5 seconds before giving up on a specific server
    )
    # The 'ping' command forces an immediate connection check
    client.admin.command('ping')
    print("✅ MongoDB Connected Automatically")
except Exception as e:
    print(f"❌ Database connection failed: {e}")

# 3. Define the database and collection
database = client.social_db
user_collection = database.get_collection("users")

class UserManager:
    def __init__(self, collection):
        self.user_collections = collection
    
    def check_user(self, user_data):
        """Checks if user exists; if not, inserts and returns the ID string."""
        try:
            if self.user_collections.find_one({"email": user_data["email"]}):
                return None
            
            result = self.user_collections.insert_one(user_data)
            return str(result.inserted_id)
        except Exception:
            return None
        
    def get_user(self, email, password):
        """Finds user by credentials and converts ObjectId to string."""
        try:
            user = self.user_collections.find_one({
                "email": email,
                "password": password,
            })
            if user:
                user["_id"] = str(user["_id"]) 
            return user
        except Exception:
            return None

# 4. Initialize the manager instance
user_manager = UserManager(user_collection)