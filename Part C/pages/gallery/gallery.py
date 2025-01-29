from flask import Blueprint, render_template
from utilities.db.db_connector import *

gallery = Blueprint(
    'gallery',
    __name__,
    static_folder='static',
    static_url_path='/gallery/static',
    template_folder='templates')



@gallery.route('/gallery/<apartment_id>', methods=['GET'])
def index(apartment_id):
    apartment = get_apartment_by_id(apartment_id)
    if apartment is None:
        return "Apartment not found", 404

    images = apartment.get('images', [])

    return render_template('gallery.html', apartment=apartment, images=images)
