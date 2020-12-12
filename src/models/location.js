const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  street_number: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
