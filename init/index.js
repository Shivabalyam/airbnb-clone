const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "685c19d43c8c2285bb39396c"})); // Set a default owner for all listings
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data.");
};

main()
  .then(() => {
    console.log('Connected to MongoDB');
    return initDB();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
