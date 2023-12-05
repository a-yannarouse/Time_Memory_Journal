
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require("../middleware/auth")
const jwt = require('jsonwebtoken');

// POST route to add a new trip
router.post('/', auth, async (req, res) => {
  try {
    const { destination, description, arrived, left, pic } = req.body;
    const userId = req.userId;
    const trip = new Trip({ user: userId, destination, description, arrived, left, pic });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve trips for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.userId });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET route to retrieve trips by id
router.get('/:tripId', auth, async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);

    // If no trip is found, return a 404 not found error
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if the trip belongs to the user making the request
    if (trip.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this trip' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trip details' });
  }
});


module.exports = router;
