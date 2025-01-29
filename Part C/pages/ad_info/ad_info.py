from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from utilities.db.db_connector import *
from flask import send_file
from bson import ObjectId
import gridfs
from utilities.db.db_connector import db

fs = gridfs.GridFS(db)
ad_info = Blueprint(
    'ad_info',
    __name__,
    static_folder='static',
    static_url_path='/ad_info/static',
    template_folder='templates')


@ad_info.route('/ad_info/<string:apartment_id>', methods=['GET'])
def index(apartment_id):
    apartment = get_apartment_by_id(apartment_id)
    if apartment is None:
        return "Apartment not found", 404

    is_favorite = False
    if 'is_logged_in' in session:
        email = session['email']
        favorites = get_favorites_by_user(email)
        if favorites and apartment_id in favorites.get('apartment_ids', []):
            is_favorite = True

    return render_template('ad_info.html', apartment=apartment, is_favorite=is_favorite)

@ad_info.route('/ad_info/favorites', methods=['POST'])
def update_favorites():
    if 'is_logged_in' not in session:
        return jsonify({"error": "User not logged in"}), 403

    data = request.get_json()
    apartment_id = data.get('apartment_id')
    action = data.get('action')

    if not apartment_id or not action:
        return jsonify({"error": "Invalid data"}), 400

    email = session['email']
    if action == 'add':
        add_favorite(email, apartment_id)
    elif action == 'remove':
        remove_favorite(email, apartment_id)

    return jsonify({"success": True})

@ad_info.route('/ad_info/image/<image_id>')
def get_image(image_id):
    grid_out = fs.get(ObjectId(image_id))
    return send_file(grid_out, mimetype='image/jpeg')