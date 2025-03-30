
import express from 'express';
import sendEmail from './emailService'; 
import Team from '../models/Team'; // Import the email sending function
import mongoose from 'mongoose';

const router = express.Router();

// Example login route
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    // Validate credentials (you can replace this with your actual validation logic)
    if (email === 'student@example.com' && password === 'password') {
        // Send login success email
        sendEmail(email, 'Login Successful', 'You have successfully logged into the Mentor-Mentee Portal.')
            .then(() => {
                res.status(200).json({ message: 'Login successful, email sent!' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to send email.' });
            });
    } else {
        res.status(401).json({ error: 'Invalid credentials.' });
    }
});

export default router;
