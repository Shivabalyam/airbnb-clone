# 🌍 Wanderlust – Airbnb Clone

A full-stack travel listing web application inspired by Airbnb. Built with Node.js, Express.js, MongoDB, and EJS, it enables users to list and discover accommodations with integrated map and image functionalities.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap 5
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Passport.js, express-session, connect-mongo
- **Image Uploads:** Cloudinary, Multer
- **Maps & Location:** Mapbox API
- **Validation:** Joi, Mongoose Middlewares
- **Deployment:** Render

---

## ✨ Features

- 🏡 **CRUD for Listings:** Create, view, update, and delete property listings
- 📸 **Image Uploads:** Upload and store listing images via Cloudinary
- 🗺️ **Map Integration:** Add and display listings with geolocation using Mapbox
- 🔐 **Authentication & Authorization:** Secure user registration, login, logout, and access control
- 📝 **Reviews System:** Users can leave reviews and ratings with validation and ownership checks
- 🧾 **Server & Client Validation:** Form validation using Bootstrap and Joi
- 📦 **MVC Architecture:** Organized, scalable codebase following the MVC pattern
- 💾 **MongoDB Session Store:** Persistent sessions with `connect-mongo`
- 🚀 **Deployed on Render**

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret


##installation:

# Clone the repository
git clone https://github.com/your-username/wanderlust.git
cd wanderlust

# Install dependencies
npm install

# Create .env file with credentials (see above)

# Run the application
node app.js
# or
npx nodemon app.js
