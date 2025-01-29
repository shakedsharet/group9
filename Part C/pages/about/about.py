from flask import Blueprint, render_template

about = Blueprint(
    'about',
    __name__,
    static_folder='static',
    static_url_path='/about/static',
    template_folder='templates'
)

# Routes
@about.route('/about')
def index():
    return render_template('about.html')
