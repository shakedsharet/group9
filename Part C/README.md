# UniHome - Student Housing Platform in Be'er Sheva

## Overview
UniHome is a web platform designed to help students in Be'er Sheva find and rent apartments efficiently. With a focus on simplicity and speed, users can search for apartments, post listings, and interact with landlords directly.

## Features
Users must first log in or register before they can contact landlords, post listings, save favorites, and interact with the platform.
### Apartment Listings
- Browse a wide range of student-friendly apartments.
- View detailed listings including price, size, location, and amenities.
- Each listing includes photos and a contact option.

### User Registration and Management
- Register and log in with an email and password.
- Manage personal profiles.
- Save favorite apartments.

### Post and Manage an Apartment Listing
- Allows users to create new apartment listings.
- Add details like address, number of rooms, size, price, and amenities.
- Supports image uploads for showcasing apartments.
- Users can edit or delete their listings through the "My Ads" page.

### Search and Filter Functionality
- Filter apartments by room count, price range, and neighborhood.
- Additional filters include pet-friendliness, furniture availability, and more.

### Contacting Landlords
- Users can contact apartment publishers via an integrated form.

## Installation & Setup

### Prerequisites
1. Install Python and set up a virtual environment:
   ```sh
   pip install virtualenv
   virtualenv venv
   source venv/bin/activate  # (On Windows, use `venv\Scripts\activate`)
   ```
2. Install required dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Encountering an issue? Try running this command:
   ```sh
   pip install appdirs colorama dnspython fs python-dotenv setuptools six
   ```
   
### Configuration
1. Create a `.env` file in the root directory and add the following configurations:
   ```env
   SECRET_KEY=123
   MONGO_URI=mongodb+srv://yuvala3:Yuvalush123@cluster0.1rlnf.mongodb.net/UniHome?retryWrites=true&w=majority&appName=Cluster0
   ```

### Running the Project
To start the application:
```sh
python app.py
```

## Website Structure

| Page | Description |
|-------|------------|
| Home | Landing page of the website |
| About | Information about the project |
| Search | Search for apartments with filters |
| Upload | Users can post their apartment listings |
| Ad Information | View full details of an apartment |
| Photos Gallery | View all images uploaded for a specific apartment |
| Register | New user registration page |
| Login | Page for existing users to sign in |
| User Area | Manage user settings and saved apartments |
| Contact Requests | View messages from potential renters |
| My Ads | Manage posted apartment listings, including editing and deleting them |
| Favorites | View apartments marked as favorites |
| Contact | The form filled by a renter to contact a publisher |
| Edit Apartment | Edit details of an existing apartment listing |
| User Setup | Page where users update their first name and phone number |

## Screenshots
Homepage:
![Homepage Screenshot](screenshots/Homepage.jpg)
Search:
![Search Screenshot](screenshots/search.png)
Upload:
![Upload1 Screenshot](screenshots/upload1.png)
![Upload2 Screenshot](screenshots/upload2.png)
![Upload3 Screenshot](screenshots/upload3.png)
About:
![About Screenshot](screenshots/about.png)
Favorites:
![Favorites Screenshot](screenshots/favorites.png)
Login:
![Login Screenshot](screenshots/login.jpg)
Register:
![Register Screenshot](screenshots/register.jpg)
Register Verification:
![Register Verification Screenshot](screenshots/register_verif.jpg)
User Setup:
![User Setup Screenshot](screenshots/user_setup.png)
User Area:
![User Area Screenshot](screenshots/user_area.png)
My Ads:
![My Ads Screenshot](screenshots/my_ads.png)
Contact Requests:
![Contact Requests Screenshot](screenshots/contact_requests.png)
Contact:
![Contact Screenshot](screenshots/contact.jpg)
Ad Information:
![Ad Information1 Screenshot](screenshots/ad_info1.png)
![Ad Information2 Screenshot](screenshots/ad_info2.png)
Edit Apartment:
![Edit Apartment Screenshot](screenshots/edit_apartment.png)
Gallery:
![Gallery Screenshot](screenshots/gallery.jpg)
## Notes
- All listed apartments are located in Be'er Sheva only.
- Images can only be added when creating a new listing; they cannot be edited later.
- Every user can both search for and post apartments.
- If an apartment is no longer available for rent, the publisher will remove it from the database.
- When an ad is deleted, the seeker's contact request remains for the publisher's reference if the apartment becomes relevant again.

