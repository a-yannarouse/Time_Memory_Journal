//imports
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signin, signup, google_auth } = require("../controllers/user.js");

//routes used for the user path
router.post("/signin", signin)
router.post("/signup", signup)
router.post("/google-auth", google_auth)




module.exports = router;
