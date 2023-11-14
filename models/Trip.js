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
  }
  // You can add more fields as needed
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;