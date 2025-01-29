from flask import Blueprint, render_template, request, session, redirect, url_for, flash, current_app
from utilities.db.db_connector import *
import gridfs
from werkzeug.utils import secure_filename


upload = Blueprint(
    'upload',
    __name__,
    static_folder='static',
    static_url_path='/upload/static',
    template_folder='templates'
)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
fs = gridfs.GridFS(db)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload.route('/upload', methods=['GET', 'POST'])
def index():
    if 'is_logged_in' not in session:
        return redirect(url_for('login.index', next=request.url))

    if request.method == 'GET':
        first_name = session.get('first_name')
        last_name = session.get('last_name')
        return render_template('upload.html', first_name=first_name, last_name=last_name)

    if request.method == 'POST':
        name = request.form['name']
        address = request.form['address']
        rooms = request.form['rooms']
        size = request.form['size']
        distance = request.form['distance']
        price = request.form['price']
        floor = request.form['floor']
        neighborhood = request.form['neighborhood']
        description = request.form['description']
        user_email = session['email']
        furnished = 'furnished' in request.form
        pets = 'pets' in request.form
        shelter = 'shelter' in request.form
        garden = 'garden' in request.form
        renovated = 'renovated' in request.form
        publish_date = request.form['publishDate']


        images = []
        if 'image' in request.files:
            files = request.files.getlist('image')
            for file in files:
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file_data = file.read()
                    grid_out = fs.put(file_data, filename=filename)
                    images.append(str(grid_out))

        apartment = {
            'name': name,
            'address': address,
            'rooms': rooms,
            'size': size,
            'distance': distance,
            'price': price,
            'floor': floor,
            'neighborhood': neighborhood,
            'description': description,
            'user_email': user_email,
            'publish_date': publish_date,
            'details': {
                'furnished': furnished,
                'pets': pets,
                'shelter': shelter,
                'garden': garden,
                'renovated': renovated
            },
            'images': images
        }

        insert_apartment(apartment)
        return redirect(url_for('my_ads.index'))