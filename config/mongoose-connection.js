const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose'); // Updated to use 'debug'
const config = require('config');

// Ensure the config file contains 'MONGODB_URL'
const mongodbUrl = config.get('MONDODB_URL');

// Use template literals correctly
mongoose.connect(`${mongodbUrl}/bagoo`,)
.then(() => {
    debug('Connected to MongoDB');
})
.catch(err => {
    debug('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;
