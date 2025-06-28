require('dotenv').config();


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");


const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

const session = require('express-session');
const MongoStore = require('connect-mongo'); // Use connect-mongo for session storage in MongoDB
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');



const dburl = process.env.ATLASDB_URL;
async function main() {
    try {
        await mongoose.connect(dburl);
        console.log(" Connected to MongoDB");
    } catch (err) {
        console.error(" MongoDB connection error:", err);
    }
}
main();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate); // Use ejsMate for layout support
app.use(methodOverride('_method')); // for PUT and DELETE requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory



const store = MongoStore.create({
    mongoUrl: dburl,
    collectionName: 'sessions', 
    touchAfter: 24 * 3600, // How often to update the session
    crypto: {
        secret: process.env.SECRET,
        },
});

store.on('error', (e) => {
    console.error('Session store error:', e);
});



const sessionOptions = {
    store: store,
    secret: process.env.SECRET, // Use a secret from environment variables
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24, // 1 day
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Helps prevent XSS attacks
    }

};


// Initialize session and flash
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Use LocalStrategy for authentication

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user; // Make current user available in all views
    next();
});



app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use("/",userRouter);


// Catch-all route for 404 errors
app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    next(error);
});


// Error handling middleware
// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     const message = err.message || "Something went wrong!";
    
//     if (req.headers['content-type'] === 'application/json' || req.xhr) {
//         res.status(statusCode).json({ error: message });
//     } else {
//         res.status(statusCode).render("listings/error", { err, message });
//     }
// });
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.error("Error:", err); // ADD THIS
    const message = err.message || "Something went wrong!";
    res.status(statusCode).render("listings/error", { err, message });
});



app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


