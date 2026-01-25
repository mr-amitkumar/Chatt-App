import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
from datetime import datetime

load_dotenv()

ca = certifi.where()

try:
    client = MongoClient(
        os.getenv("MONGO_DETAILS"),
        tls=True,
        tlsCAFile=ca,
        retryWrites=True,
        retryReads=True,
        connectTimeoutMS=30000,
        serverSelectionTimeoutMS=5000
    )
    client.admin.command('ping')
    print("✅ MongoDB Connected Automatically")
except Exception as e:
    print(f"❌ Database connection failed: {e}")

database = client.social_db
user_collection = database.get_collection("users")
posts_collection = database.get_collection("posts")

class PostManager:
    def __init__(self, collection):
        self.posts_collection = collection
    
    def save_to_db(self, text, user_name):
        try:
            post_doc = {
                "text": text,
                "firstname": user_name,
                "createdAt": datetime.utcnow() 
            }
            result = self.posts_collection.insert_one(post_doc)
            post_doc["_id"] = str(result.inserted_id)
            post_doc["time"] = post_doc["createdAt"].strftime("%I:%M %p")
            return post_doc
        except Exception as e:
            print(f"Error saving post: {e}")
            return None

    def get_all_posts(self):
        try:
            posts = list(self.posts_collection.find().sort("createdAt", -1))
            for post in posts:
                post["_id"] = str(post["_id"])
                if "createdAt" in post:
                    post["time"] = post["createdAt"].strftime("%I:%M %p")
                    del post["createdAt"] 
            return posts
        except Exception as e:
            print(f"Error fetching posts: {e}")
            return []

class UserManager:
    def __init__(self, collection):
        self.user_collections = collection
    
    def check_user(self, user_data):
        try:
            if self.user_collections.find_one({"email": user_data["email"]}):
                return None
            result = self.user_collections.insert_one(user_data)
            return str(result.inserted_id)
        except Exception:
            return None
        
    def get_user(self, email, password):
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

user_manager = UserManager(user_collection)
post_manager = PostManager(posts_collection)