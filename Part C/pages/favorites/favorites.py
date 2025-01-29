from flask import Blueprint, render_template, session, url_for, jsonify, request
from utilities.db.db_connector import *

favorites = Blueprint(
    'favorites',
    __name__,
    static_folder='static',
    static_url_path='/favorites/static',
    template_folder='templates'
)

# Routes
@favorites.route('/favorites')
def index():
    if 'is_logged_in' not in session:
        login_url = url_for('login.log_in')
        return render_template('favorites.html', login_url=login_url, show_popup=True)

    email = session['email']
    favorites_data = get_favorites_by_user(email)

    apartments = []
    if favorites_data and favorites_data.get('apartment_ids'):
        for apartment_id in favorites_data['apartment_ids']:
            apartment = get_apartment_by_id(apartment_id)
            if apartment:
                images = apartment.get('images', [])
                if images:
                    apartment['first_image'] = images[0]
                else:
                    apartment['first_image'] = None
                apartments.append(apartment)

    return render_template('favorites.html', apartments=apartments)

@favorites.route('/favorites/remove', methods=['POST'])
def remove_favorite():
    if 'is_logged_in' not in session:
        return jsonify({"error": "User not logged in"}), 403

    data = request.get_json()
    apartment_id = data.get('apartment_id')
    if not apartment_id:
        return jsonify({"error": "Invalid data"}), 400

    email = session['email']
    remove_favorite(email, apartment_id)

    # בדיקת מצב המועדפים לאחר ההסרה
    favorites_data = get_favorites_by_user(email)
    is_empty = not favorites_data or not favorites_data.get('apartment_ids')

    return jsonify({"success": True, "is_empty": is_empty})