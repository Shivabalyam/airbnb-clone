const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  location: String,
  country: String,
  image: {
    url: String,
    filename: String,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  geometry:{
    type: {
      type: String,
      enum: ['Point'], // 'type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }

});


listingSchema.post("findOneAndDelete", async (listing) =>{
  if (!listing) return; // If no listing was found, exit the function

  if(listing){
  await Review.deleteMany({_id : { $in: listing.reviews }});  // This will delete all reviews associated with the listing being deleted
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
