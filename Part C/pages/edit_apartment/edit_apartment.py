from flask import Blueprint, render_template, session, redirect, url_for, request
from utilities.db.db_connector import *

edit_apartment = Blueprint(
    'edit_apartment',
    __name__,
    template_folder='templates',
    static_url_path='/edit_apartment/static',
    static_folder='static')

@edit_apartment.route('/edit_apartment/<apartment_id>', methods=['GET'])
def index(apartment_id):
    apartment = get_apartment_by_id(apartment_id)
    if apartment:
        return render_template('edit_apartment.html', apartment=apartment)
    return "Apartment not found", 404
