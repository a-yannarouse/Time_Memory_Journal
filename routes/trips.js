// routes/trips.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Middleware to protect routes
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'secretkey', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        req.user = decodedToken; // Adjust based on your token payload
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// POST route to add a new trip
router.post('/', requireAuth, async (req, res) => {
  try {
    const { user, destination, description, arrived, left } = req.body;
    const trip = new Trip({ user, destination, description, arrived, left });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve trips for the logged-in user
router.get('/', requireAuth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
