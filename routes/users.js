//imports
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
import {signin, signup} from "../controllers/user.js"

router.post("/signin", signin)
router.post("/signup", signup)




module.exports = router;
