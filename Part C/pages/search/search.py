from flask import Blueprint, render_template, request
from utilities.db.db_connector import *

search = Blueprint(
    'search',
    __name__,
    static_folder='static',
    static_url_path='/search/static',
    template_folder='templates'
)

@search.route('/search')
def index():
    apartments = get_all_apartments()

    for apartment in apartments:
        images = apartment.get('images', [])
        if images:
            apartment['first_image'] = images[0]  # התמונה הראשונה
        else:
            apartment['first_image'] = None

    return render_template('search.html', apartments=apartments)