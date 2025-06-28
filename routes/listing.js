const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');

const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });



router.route('/')
    .get(wrapAsync(listingController.index)) // List all listings
    .post(isLoggedIn, validateListing, upload.single('image'), wrapAsync(listingController.createListing));


//new route
router.get('/new',isLoggedIn, listingController.new);

router.route('/:id')
    .get(wrapAsync(listingController.showListing)) // Show a specific listing
    .put(isLoggedIn, isOwner, validateListing, upload.single('image'), wrapAsync(listingController.updateListing)) // Update a specific listing
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete a specific listing


//edit route
router.get('/:id/edit',isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;