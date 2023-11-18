//Imports
require('dotenv').config();
const tripsRouter = require('./routes/trips');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());


//Routes
app.use('/user', usersRouter);
app.use('/trips', tripsRouter);




//connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
