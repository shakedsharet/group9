from flask import Blueprint, render_template, jsonify, session, request, redirect, url_for
from utilities.db.db_connector import *

my_ads = Blueprint(
    'my_ads',
    __name__,
    template_folder='templates',
    static_url_path='/my_ads/static',
    static_folder='static'
)
@my_ads.route('/my_ads')
def index():
    if 'is_logged_in' not in session:
        return redirect(url_for('login.index'))

    user_email = session['email']
    apartments = get_all_apartments()
    apartments = [apt for apt in apartments if apt['user_email'] == user_email]

    message = None
    if not apartments:
        message = "לא הועלו על ידך מודעות."

    for apartment in apartments:
        if apartment['images']:
            apartment['first_image'] = apartment['images'][0]
        else:
            apartment['first_image'] = None
    return render_template('my_ads.html', apartments=apartments, message=message)

@my_ads.route('/delete/<apartment_id>', methods=['DELETE'])
def delete(apartment_id):
    print(f"Deleting apartment with ID: {apartment_id}")

    apartment = get_apartment_by_id(apartment_id)
    if apartment and apartment['user_email'] == session['email']:
        result = delete_apartment(apartment_id)
        if result:
            return jsonify({'success': True, 'message': 'המודעה נמחקה בהצלחה'}), 200
        else:
            return jsonify({'success': False, 'error': 'לא הצלחנו למחוק את המודעה'}), 500
    else:
        return jsonify({'success': False, 'error': 'מודעה לא נמצאה או שהמשתמש אינו זה שפרסם אותה'}), 403



@my_ads.route('/edit/<apartment_id>', methods=['GET'])
def edit(apartment_id):
    apartment = get_apartment_by_id(apartment_id)
    if not apartment:
        return "Apartment not found", 404
    return render_template('edit_apartment.html', apartment=apartment)

@my_ads.route('/update/<apartment_id>', methods=['POST'])
def update(apartment_id):
    apartment = get_apartment_by_id(apartment_id)
    if not apartment:
        return "Apartment not found", 404

    # עדכון פרטי הדירה
    updated_apartment = {
            'name': request.form['name'],
            'address': request.form['address'],
            'rooms': request.form['rooms'],
            'size': request.form['size'],
            'distance': request.form['distance'],
            'price': request.form['price'],
            'floor': request.form['floor'],
            'neighborhood': request.form['neighborhood'],
            'description': request.form['description'],
            'user_email': session['email'],
            'details': {
                'furnished': 'furnished' in request.form,
                'pets': 'pets' in request.form,
                'shelter': 'shelter' in request.form,
                'garden': 'garden' in request.form,
                'renovated': 'renovated' in request.form
            }
    }

    update_apartment(apartment_id, updated_apartment)  # עדכון בדאטה-בייס
    return redirect(url_for('my_ads.index'))

