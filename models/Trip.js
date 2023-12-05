const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  description: String,
  arrived: {
    type: Date,
    required: true
  },
  left: {
    type: Date,
    required: true
  },
  pic: {
    type: String,
    required: true
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;