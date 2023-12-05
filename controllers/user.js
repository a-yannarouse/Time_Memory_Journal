//imports
require('dotenv').config({ path: 'C:/Users/nawaf/Desktop/411/.env' });
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

//signin function
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//signup function
const signup = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 8)

        const result = await User.create({ email: email, password: hashedPassword, username: username })

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: "Username or email exists" })
    }
}

const client = new OAuth2Client("870205317500-9gjs5gfkrmd36mhmntj0f8uq81q81s3m.apps.googleusercontent.com");

const google_auth = async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "870205317500-9gjs5gfkrmd36mhmntj0f8uq81q81s3m.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload; // 'sub' is the unique Google ID

        // Check if user already exists in database
        let user = await User.findOne({ email });

        if (!user) {
            // Generate a random, secure password
            const randomPassword = crypto.randomBytes(16).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 8)

            // If user does not exist, create a new user
            user = await User.create({
                username: name, 
                email,
                password: hashedPassword, 
            });
        }

        // Create a token for the user 
        const userToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({success: true, user: user, token: userToken });
    } catch (error) {
        res.status(500).json({ message: "Error authenticating with Google: " + error.message });
    }
}
module.exports = { signin, signup, google_auth };