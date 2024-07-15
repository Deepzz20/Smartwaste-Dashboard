const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');


// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid email');
        }

        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }

        const userPayload = user.toObject();

        jwt.sign(userPayload, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) {
                console.error('Error during token creation:', err);
                return res.status(500).send('Token creation failed');
            }
            res.status(200).json(token);
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// User signup
router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email is already registered
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }

        const newUser = await Users.create(req.body);
        const userPayload = newUser.toObject();

        jwt.sign(userPayload, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) {
                console.error('Error during token creation:', err);
                return res.status(500).send('Token creation failed');
            }
            res.status(200).json(token);
        });
    } catch (error) {
        console.error('Error during signup:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Set token for user
router.post('/setToken', async (req, res) => {
    const { userId } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const userPayload = user.toObject();

    jwt.sign(userPayload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) {
            return res.status(500).send('Token creation failed');
        }
        res.status(200).json(token);
    });
});

// Routes for authentication
router.post('/authenticate', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).send('Unauthorized: Token missing');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden: Invalid token');
        }

        // Respond with success and user information
        res.status(200).json({ message: 'Authentication successful', user });
    });
});


// Get all users
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await Users.find().sort({ userId: 1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific user by ID
router.get('/getUser/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).send(error.message);
    }
});

// Create a new user
router.post('/createNewUser', async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Update a user by ID
router.put('/updateUser/:id', async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).send(error.message);
    }
});

// Delete a user by ID
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
