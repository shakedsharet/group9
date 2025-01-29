from flask import Blueprint, render_template, url_for, session, redirect, jsonify, request
from utilities.db.db_connector import *

contact_requests = Blueprint(
    'contact_requests',
    __name__,
    static_folder='static',
    static_url_path='/contact_requests/static',
    template_folder='templates'
)

@contact_requests.route('/contact_requests')
def index():
    user_email = session.get('email')
    if not user_email:
        return redirect(url_for('login.index'))

    user_requests = get_requests_by_user(user_email)

    for req in user_requests:
        apartment = get_apartment_by_id(req["ad_id"])
        if apartment and "images" in apartment and apartment["images"]:
            req["first_image"] = apartment["images"][0]

    return render_template('contact_requests.html', requests=user_requests)


@contact_requests.route('/update_status/<request_id>', methods=['POST'])
def update_status(request_id):
    new_status = request.json.get('status')
    result = db.contacts.update_one({"_id": ObjectId(request_id)}, {"$set": {"status": new_status}})
    if result.modified_count > 0:
        return jsonify({"success": True}), 200
    return jsonify({"success": False}), 400

