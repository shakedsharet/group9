from flask import Blueprint, render_template, request, redirect, url_for, session
from utilities.db.db_connector import *

contact = Blueprint(
    'contact',
    __name__,
    static_folder='static',
    static_url_path='/contact/static',
    template_folder='templates'
)

# Routes
@contact.route('/contact')
def index():
    user_email = session.get('email')
    user_details = get_user(user_email) if user_email else {}
    return render_template('contact.html', user=user_details)

@contact.route('/contact', methods=['POST'])
def send():
    if request.method == 'POST':
        ad_id = request.form.get('ad_id')
        publisher_email = request.form.get('publisher_email')
        full_name = request.form.get('fullName')
        email = request.form.get('email')
        phone = request.form.get('phone')
        description = request.form.get('description')
        status = 'חדש'

        save_contact_request(ad_id, publisher_email, full_name, email, phone, description, status)

        return redirect(url_for('ad_info.index', apartment_id=ad_id))
