import os
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

client = MongoClient(os.getenv("MONGO_DETAILS"))
database = client.social_db
user_collection = database.get_collection("users")

class UserManager:
    def __init__(self, collection):
        self.user_collections = collection
   
    def check_user(self, user_data):
        # creating the user
        if self.user_collections.find_one({"email" : user_data["email"]}):
            return None
        
        result = self.user_collections.insert_one(user_data)# adding the userdetails
        return str(result.inserted_id)
        
    def get_user(self, email, password):
        user = self.user_collections.find_one({
            "email" : email,
            "password" : password,
        })
        if user:
            user["_id"] = str(user["_id"]) #converting the objectid to the strings for react
        return user


user_manager = UserManager(user_collection)