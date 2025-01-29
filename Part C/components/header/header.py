from flask import Blueprint, session

header = Blueprint(
    'header',
    __name__,
    static_folder='static',
    static_url_path='/components/header/static',
    template_folder='templates'
)

@header.context_processor
def inject_is_logged_in_to_header():
    is_logged_in = session.get('is_logged_in', False)
    return {'is_logged_in': is_logged_in}
