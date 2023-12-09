//Imports
require('dotenv').config()
const tripsRouter = require('./routes/trips');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

app.use(cors({
  origin: "*"
}));
app.use(express.json());

//Routes
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
