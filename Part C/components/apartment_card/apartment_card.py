from flask import Blueprint

apartment_card = Blueprint(
    'apartment_card',
    __name__,
    static_folder='static',
    static_url_path='/components/apartment_card/static',
    template_folder='templates'
)

