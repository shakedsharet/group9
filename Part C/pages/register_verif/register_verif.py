from flask import Blueprint, render_template

register_verif = Blueprint(
    'register_verif',
    __name__,
    static_folder='static',
    static_url_path='/register_verif/static',
    template_folder='templates'
)

# Routes
@register_verif.route('/register_verif')
def index():
    return render_template('register_verif.html')
