from flask import Blueprint, render_template, session, redirect, url_for, request
from utilities.db.db_connector import *

login = Blueprint(
    'login',
    __name__,
    template_folder='templates',
    static_url_path='/login/static',
    static_folder='static')

@login.route('/login')
def index():
    return render_template('login.html')

@login.route('/login', methods=['GET', 'POST'])
def log_in():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = find_user_by_email(email)
        if not user:
            return render_template('login.html', error="לא נמצא משתמש עם כתובת אימייל זו.")

        if user['password'] != password:
            return render_template('login.html', error="סיסמה שגויה.")

        session['is_logged_in'] = True
        session['email'] = email
        session.update(user.get('details', {}))

        return redirect(url_for('homepage.index'))
    return render_template('login.html')

@login.route('/logout')
def log_out():
    session.clear()
    return redirect(url_for('homepage.index'))

