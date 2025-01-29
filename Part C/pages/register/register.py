from flask import Blueprint, render_template, request ,redirect, url_for, session
from utilities.db.db_connector import *

# register blueprint definition
register = Blueprint(
    'register',
    __name__,
    static_folder='static',
    static_url_path='/register/static',
    template_folder='templates'
)

# Routes
@register.route('/register', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        first_name = request.form.get('first_name', '')
        last_name = request.form.get('last_name', '')
        phone = request.form.get('phone', '')

        if find_user_by_email(email):
            return render_template('register.html', error="משתמש זה כבר קיים.")

        user_data = {
            "email": email,
            "password": password,
            "details": {
                "first_name": first_name,
                "last_name": last_name,
                "phone": phone,
                "role": []
            }
        }
        register_user(user_data)
        session['is_logged_in'] = True
        session['email'] = email
        session.update(user_data['details'])

        return redirect(url_for('register_verif.index'))
    return render_template('register.html')