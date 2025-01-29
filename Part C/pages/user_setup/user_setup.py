from flask import Blueprint,render_template, session,  request, url_for, redirect
from utilities.db.db_connector import *
user_setup = Blueprint(
    'user_setup',
    __name__,
    static_folder='static',
    static_url_path='/user_setup/static',
    template_folder='templates'
)

# Routes
@user_setup.route('/user_setup')
def index():
    email = session.get('email')
    user = get_user(email)

    if user and 'details' in user:
        session.update(user['details'])

    return render_template('user_setup.html')

@user_setup.route('/user_setup', methods=['GET', 'POST'])
def setup():
    if request.method == 'POST':
        email = session.get('email')

        details = {
            "first_name": request.form.get('firstName'),
            "last_name": request.form.get('lastName'),
            "phone": request.form.get('phone')
        }
        update_user(email, details)
        session.update(details)
        return redirect(url_for('user_area.index'))