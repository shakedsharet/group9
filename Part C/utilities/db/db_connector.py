from datetime import datetime
import urllib.parse

import fs
import gridfs
from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

username = urllib.parse.quote_plus("yuvala3")
password = urllib.parse.quote_plus("Yuvalush123@")
uri = f"mongodb+srv://{username}:{password}@cluster0.1rlnf.mongodb.net/UniHome?retryWrites=true&w=majority&appName=Cluster0"

myclient = MongoClient(uri, server_api=ServerApi('1'))
db = myclient["UniHome"]
# Collections
users_col = db['users']
apartments_col = db['apartments']
favorites_col = db['favorites']
contacts_col = db['contacts']

fs = gridfs.GridFS(db)

# Functions
# --- Login & Register ---
def find_user_by_email(email):
    return users_col.find_one({"email": email})

def register_user(data):
    users_col.insert_one(data)

def get_user(email):
    return users_col.find_one({"email": email}, {"_id": 0})

def update_user(email, updates):
    users_col.update_one({"email": email}, {"$set": {"details": updates}})


# --- Apartement Information ---
def get_all_apartments():
    apartments = list(apartments_col.find())
    for apt in apartments:
        apt['id'] = str(apt['_id'])
    return apartments

def insert_apartment(apartment_dict):
    apartments_col.insert_one(apartment_dict)

def get_apartment_by_id(apartment_id):
    try:
        apartment_id = ObjectId(apartment_id)
    except Exception as e:
        print(f"Invalid ID format: {e}")
        return None
    return apartments_col.find_one({"_id": apartment_id})


def delete_apartment(apartment_id):
    print(f"Attempting to delete apartment with ID: {apartment_id}")
    try:
        apartment_id = ObjectId(apartment_id)
    except Exception as e:
        print(f"Invalid ID format: {e}")
        return False

    print(
        f"Before deletion - fs.files count: {db.fs.files.count_documents({})}, fs.chunks count: {db.fs.chunks.count_documents({})}")

    apartment = apartments_col.find_one({"_id": apartment_id})
    if not apartment:
        print(f"No apartment found with ID: {apartment_id}")
        return False

    if "images" in apartment:
        for image_id in apartment["images"]:
            try:
                file_obj = fs.get(ObjectId(image_id))
                if file_obj:
                    fs.delete(ObjectId(image_id))
                    print(f"Deleted image with ID: {image_id}")

                db["fs.chunks"].delete_many({"files_id": ObjectId(image_id)})
                db["fs.files"].delete_one({"_id": ObjectId(image_id)})

            except Exception as e:
                print(f"Error deleting image {image_id}: {e}")

    result = apartments_col.delete_one({"_id": apartment_id})
    if result.deleted_count == 0:
        print(f"Failed to delete apartment with ID: {apartment_id}")
        return False
    else:
        print(f"Apartment with ID: {apartment_id} and its images deleted successfully.")

    print(
        f"After deletion - fs.files count: {db.fs.files.count_documents({})}, fs.chunks count: {db.fs.chunks.count_documents({})}")

    return True

def update_apartment(apartment_id, updated_data):
    apartments_col.update_one(
        {"_id": ObjectId(apartment_id)},
        {"$set": updated_data}
    )


# --- Favorites ---
def get_favorites_by_user(email):
    return favorites_col.find_one({"user_email": email})

def add_favorite(email, apartment_id):
    favorites_col.update_one(
        {"user_email": email},
        {"$addToSet": {"apartment_ids": apartment_id}},
        upsert=True
    )

def remove_favorite(email, apartment_id):
    favorites_col.update_one(
        {"user_email": email},
        {"$pull": {"apartment_ids": apartment_id}}
    )


# --- Contact Requests ---
def save_contact_request(ad_id, publisher_email, full_name, email, phone, description, status):
    apartment = get_apartment_by_id(ad_id)
    apartment_address = apartment.get("address", "כתובת לא זמינה") if apartment else "כתובת לא זמינה"

    contact = {
        "ad_id": ad_id,
        "publisher_email": publisher_email,
        "name": full_name,
        "email": email,
        "phone": phone,
        "message": description,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "apartment_address": apartment_address,
        "status": status
    }
    db.contacts.insert_one(contact)

def get_requests_by_user(email):
    return list(db.contacts.find({"publisher_email": email}))