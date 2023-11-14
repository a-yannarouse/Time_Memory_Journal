//imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//signin function
export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//signup function
export const signup = async (req, res) => {
    const {email, password, username} = req.body;

    try {
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 8)

        const result = await User.create({email: email, password: hashedPassword, username: username})

        const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({result: result, token});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}