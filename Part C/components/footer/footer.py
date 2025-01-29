from flask import Blueprint

footer = Blueprint(
    'footer',
    __name__,
    static_folder='static',
    static_url_path='/components/footer/static',
    template_folder='templates'
)

