const User = require('../models/user');
const passport = require('passport');




module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup');
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.signup = async (req, res) => {
    try{
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, err => {
        if (err) {
            req.flash('error', 'Login failed after registration');
            return res.redirect('/signup');
            // return next(err);
        }
        req.flash('success', 'welcome to Wanderlust!');
        res.redirect('/listings');
    });
    
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/signup');
    }
};

module.exports.login = async (req,res) => {
    req.flash("success", ' welcome back to wanderlust ');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'you are logged out!');
        res.redirect('/listings');
    });
};

