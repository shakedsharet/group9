from flask import Flask, render_template

from pages.homepage.homepage import homepage
from pages.about.about import about
from pages.favorites.favorites import favorites
from pages.register.register import register
from pages.register_verif.register_verif import register_verif
from pages.login.login import login
from pages.search.search import search
from pages.ad_info.ad_info import ad_info
from pages.contact.contact import contact
from pages.gallery.gallery import gallery
from pages.my_ads.my_ads import my_ads
from pages.user_area.user_area import user_area
from pages.user_setup.user_setup import user_setup
from pages.upload.upload import upload
from pages.contact_requests.contact_requests import contact_requests
from pages.edit_apartment.edit_apartment import edit_apartment
from components.header.header import header
from components.footer.footer import footer
from components.apartment_card.apartment_card import apartment_card

# App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')
app.secret_key = "123"

# @app.before_request
# def clear_session_on_restart():
#     session.clear()

# Register all blueprints
app.register_blueprint(homepage)
app.register_blueprint(about)
app.register_blueprint(favorites)
app.register_blueprint(register)
app.register_blueprint(register_verif)
app.register_blueprint(gallery)
app.register_blueprint(my_ads)
app.register_blueprint(contact_requests)
app.register_blueprint(contact)
app.register_blueprint(user_area)
app.register_blueprint(user_setup)
app.register_blueprint(login)
app.register_blueprint(search)
app.register_blueprint(ad_info)
app.register_blueprint(header)
app.register_blueprint(footer)
app.register_blueprint(apartment_card)
app.register_blueprint(upload)
app.register_blueprint(edit_apartment)



# Run the app
if __name__ == '__main__':
    app.run(debug=True)



