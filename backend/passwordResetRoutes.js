const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('./utils');
const crypto = require('crypto');
const saltRounds = 10;
const router = express.Router();

const Student = mongoose.model('Student');
const Editor = mongoose.model('Editor');
const Client = mongoose.model('Client');

const passwordResetTokens = new Map();

const generateSecureTokenAndCode = () => {
    const token = crypto.randomBytes(20).toString('hex');
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a 6 digit code
    return { token, code };
};

async function findUserByEmail(email) {
    const models = [Student, Editor, Client];
    for (let model of models) {
        const user = await model.findOne({ email }).exec();
        if (user) {
            const origin = model.modelName;
            console.log(`Found user in ${origin}`);
            return { user, model, origin };
        }
    }
    return null;
}

router.post('/request_reset', async (req, res) => {
    console.log("Processing reset request for:", req.body.email);
    const { email } = req.body;
    const result = await findUserByEmail(email);

    if (!result) {
        console.log("No user found for email:", email);
        return res.status(200).send({ message: 'If that email address is in our records, we will send instructions for resetting your password.' });
    }

    const { user, origin } = result;
    const { token, code } = generateSecureTokenAndCode();

    passwordResetTokens.set(token, { email: user.email, origin, code, expiration: Date.now() + 3600000 });
    
    console.log("Sending verification code:", code, "to", email);
    sendVerificationEmail(user.email, `Your verification code is: ${code}`)
        .then(() => res.status(200).send({ message: 'Please check your email for the password reset instructions.' }))
        .catch(error => {
            console.error('Error sending password reset email:', error);
            res.status(500).send({ message: 'Error sending password reset instructions.' });
        });
});

router.post('/verify_reset_code', async (req, res) => {
    console.log("Verifying reset code for:", req.body.email);
    const { email, verificationCode } = req.body;

    const tokenEntry = [...passwordResetTokens.entries()].find(([token, value]) =>
        value.email === email && value.code.toString() === verificationCode);
    
    if (!tokenEntry) {
        console.log("Verification failed for:", email);
        return res.status(400).send({ message: 'Verification failed or code expired.' });
    }

    const [token, _] = tokenEntry; 

    console.log("Verification successful for:", email);
    
    res.send({ message: 'Verification successful.', token: token });
});

router.post('/reset', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("Processing password reset for token:", token);
    const tokenData = passwordResetTokens.get(token);

    if (!tokenData || tokenData.expiration < Date.now()) {
        console.log("Token invalid or expired:", token);
        return res.status(400).send({ message: 'Reset token is invalid or has expired.' });
    }

    
    const result = await findUserByEmail(tokenData.email);
    if (!result) {
        console.log("No user found for token:", token);
        return res.status(404).send({ message: 'User not found.' });
    }

    const { user, model } = result; 
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await model.findByIdAndUpdate(user._id, { password: hashedPassword }); 

    console.log("Password reset successful for:", tokenData.email);
    passwordResetTokens.delete(token);

    res.send({ message: 'Your password has been reset successfully.' });
});


module.exports = router;
