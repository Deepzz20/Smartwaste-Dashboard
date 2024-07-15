const express = require('express');
const router = express.Router();
const Drivers = require('../models/drivers');
const jwt = require('jsonwebtoken');

// Driver login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const driver = await Drivers.findOne({ email });

        if (!driver) {
            return res.status(401).send('Invalid email');
        }

        if (driver.password !== password) {
            return res.status(401).send('Invalid password');
        }

        const driverPayload = driver.toObject();

        jwt.sign(driverPayload, process.env.JWT_SECRET_KEY, (err, token) => {
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

// Driver signup
router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email is already registered
        const existingDriver = await Drivers.findOne({ email });
        if (existingDriver) {
            return res.status(400).send('Email already in use');
        }

        // Create a new driver
        const newDriver = await Drivers.create(req.body);
        const driverPayload = newDriver.toObject();

        jwt.sign(driverPayload, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) {
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

// Set token for driver
router.post('/setToken', async (req, res) => {
    const { driverId } = req.body;
    const driver = await Drivers.findById(driverId);
    if (!driver) {
        return res.status(404).send('Driver not found');
    }
    const driverPayload = driver.toObject();

    jwt.sign(driverPayload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) {
            return res.status(500).send('Token creation failed');
        }
        res.status(200).json(token);
    });
});

// Routes for driver authentication
router.post('/authenticate', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).send('Unauthorized: Token missing');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, driver) => {
        if (err) {
            return res.status(403).send('Forbidden: Invalid token');
        }

        res.status(200).json({ message: 'Authentication successful', driver });
    });
});



// Get all drivers
router.get('/getAllDrivers', async (req, res) => {
    try {
        const drivers = await Drivers.find().sort({ driverId: 1 });
        res.status(200).json(drivers);
    } catch (error) {
        console.error('Error getting drivers:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific driver by ID
router.get('/getDriver/:id', async (req, res) => {
    try {
        const driver = await Drivers.findById(req.params.id);
        if (!driver) {
            return res.status(404).send('Driver not found');
        }
        res.status(200).json(driver);
    } catch (error) {
        console.error('Error getting driver by ID:', error);
        res.status(500).send(error.message);
    }
});

// Create a new driver
router.post('/createNewDriver', async (req, res) => {
    try {
        const newDriver = await Drivers.create(req.body);
        res.status(201).json(newDriver);
    } catch (error) {
        console.error('Error creating driver:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Update a driver by ID
router.put('/updateDriver/:id', async (req, res) => {
    try {
        const updatedDriver = await Drivers.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDriver) {
            return res.status(404).send('Driver not found');
        }
        res.status(200).json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver by ID:', error);
        res.status(500).send(error.message);
    }
});

// Delete a driver by ID
router.delete('/deleteDriver/:id', async (req, res) => {
    try {
        const deletedDriver = await Drivers.findByIdAndDelete(req.params.id);
        if (!deletedDriver) {
            return res.status(404).send('Driver not found');
        }
        res.status(200).send('Driver deleted successfully');
    } catch (error) {
        console.error('Error deleting driver by ID:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
