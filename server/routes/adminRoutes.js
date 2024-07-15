const express = require('express');
const router = express.Router();
const AdminUsers = require('../models/adminUsers');
const jwt = require('jsonwebtoken');


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



router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        const user = await AdminUsers.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid email');
        }

        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }

        const expiresIn = rememberMe ? '30d' : '1d';   // Set longer time if user sets remember me
        const data = { firstName: user.firstName, lastName: user.lastName, email: user.email, rememberMe: rememberMe };

        jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn }, (err, token) => {
            if (err) {
                return res.status(500).send('Token creation failed');
            }
            res.status(200).json(token);
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/setToken', async (req, res) => {
    const { firstName, lastName, email, rememberMe } = req.body;
    const expiresIn = rememberMe ? '30d' : '1d';   // Set longer time if user sets remember me
    const data = { firstName: firstName, lastName: lastName, email: email, rememberMe: rememberMe };

    jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn }, (err, token) => {
        if (err) {
            return res.status(500).send('Token creation failed');
        }
        res.status(200).json(token);
    });
});



// Get all admin users
router.get('/getAllAdminUsers', async (req, res) => {
    try {
        const AdminUsers = await AdminUsers.find().sort({ adminUserId: 1 });
        res.status(200).json(AdminUsers);
    } catch (error) {
        console.error('Error getting admin users:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific admin user by ID
router.get('/getAdminUser/:id', async (req, res) => {
    try {
        const adminUser = await AdminUsers.findById(req.params.id);
        if (!adminUser) {
            return res.status(404).send('Admin user not found');
        }
        res.status(200).json(adminUser);
    } catch (error) {
        console.error('Error getting admin user by ID:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific admin user by email
router.get('/getAdminUserByEmail/:email', async (req, res) => {
    try {
        const adminUser = await AdminUsers.findOne({ email: req.params.email });
        if (!adminUser) {
            return res.status(404).send('Admin user not found');
        }
        res.status(200).json(adminUser);
    } catch (error) {
        console.error('Error getting admin user by email:', error);
        res.status(500).send(error.message);
    }
});


// Create a new admin user
router.post('/createNewAdminUser', async (req, res) => {
    try {
        const newAdminUser = await AdminUsers.create(req.body);
        res.status(201).json(newAdminUser);
    } catch (error) {
        console.error('Error creating admin user:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Update an admin user by ID
router.put('/updateAdminUser/:id', async (req, res) => {
    try {
        const updatedAdminUser = await AdminUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdminUser) {
            return res.status(404).send('Admin user not found');
        }
        res.status(200).json(updatedAdminUser);
    } catch (error) {
        console.error('Error updating admin user by ID:', error);
        res.status(500).send(error.message);
    }
});

// Delete an admin user by ID
router.delete('/deleteAdminUser/:id', async (req, res) => {
    try {
        const deletedAdminUser = await AdminUsers.findByIdAndDelete(req.params.id);
        if (!deletedAdminUser) {
            return res.status(404).send('Admin user not found');
        }
        res.status(200).send('Admin user deleted successfully');
    } catch (error) {
        console.error('Error deleting admin user by ID:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;