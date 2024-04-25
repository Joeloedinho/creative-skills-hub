const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
const saltRounds = 10;

// Assuming you have models already defined somewhere and imported here
const Student = mongoose.model('Student');
const Editor = mongoose.model('Editor');
const Client = mongoose.model('Client');

router.post('/', async (req, res) => {
    console.log("Login route hit", req.body);
    const { email, password } = req.body;

    async function checkUserInCollection(collection, userType) {
        try {
            const user = await collection.findOne({ email }).lean();
            if (user && await bcrypt.compare(password, user.password)) {
                // Generate a token with user ID and user type
                const token = jwt.sign(
                    { id: user._id, userType: userType, email: user.email }, // Include email here
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '24h' }
                );
                
                return { found: true, userType, token };
            }
        } catch (error) {
            console.error(`Error authenticating ${userType}:`, error);
            return { found: false, error };
        }
        return { found: false };
    }

    const checks = [
        checkUserInCollection(Student, 'student'),
        checkUserInCollection(Editor, 'editor'),
        checkUserInCollection(Client, 'client')
    ];

    const results = await Promise.all(checks);
    const match = results.find(result => result.found);

    if (match) {
        if (match.error) {
            res.status(500).json({ message: "Error during login process" });
        } else {
            res.json({
                message: "Login successful",
                userType: match.userType,
                token: match.token // Send the token to the client
            });
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

module.exports = router;
