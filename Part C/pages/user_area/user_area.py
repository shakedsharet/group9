from flask import Blueprint, render_template, session

user_area = Blueprint(
    'user_area',
    __name__,
    static_folder='static',
    static_url_path='/user_area/static',
    template_folder='templates'
)

# Routes
@user_area.route('/user_area')
def index():
    first_name = session.get('first_name')
    last_name = session.get('last_name')
    email = session.get('email')
    return render_template(
        'user_area.html',
        first_name=first_name,
        last_name=last_name,
        email=email)