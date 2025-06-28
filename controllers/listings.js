const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate('owner');
    if(!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render("listings/show.ejs", {listing});
};


module.exports.createListing = async (req, res, next) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the current user
    newListing.image = {url, filename}; // Set the image URL and filename
    newListing.geometry = response.body.features[0].geometry; // Set the geometry from the geocoding response
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash('success', 'Successfully created a new listing!');
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", {listing});
};


module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, {new: true});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url, filename}; // Update the image URL and filename
        await updatedListing.save();
    }
    req.flash('success', 'listing updated!');
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'listing deleted successfully!');
    res.redirect('/listings');
};