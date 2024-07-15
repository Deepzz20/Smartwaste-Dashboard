const express = require('express');
const router = express.Router();
const Bins = require('../models/bins');


// Get all bins
router.get('/getAllBins', async (req, res) => {
    try {
        const bins = await Bins.find().sort({ binId: 1 });
        res.status(200).json(bins);
    } catch (error) {
        console.error('Error getting bins:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific bin by ID
router.get('/getBin/:id', async (req, res) => {
    try {
        const bin = await Bins.findById(req.params.id);
        if (!bin) {
            return res.status(404).send('Bin not found');
        }
        res.status(200).json(bin);
    } catch (error) {
        console.error('Error getting bin by ID:', error);
        res.status(500).send(error.message);
    }
});

// Create a new bin
router.post('/createNewBin', async (req, res) => {
    try {
        const newBin = await Bins.create(req.body);
        res.status(201).json(newBin);
    } catch (error) {
        console.error('Error creating bin:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Update a bin by ID
router.put('/updateBin/:id', async (req, res) => {
    try {
        const updatedBin = await Bins.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBin) {
            return res.status(404).send('Bin not found');
        }
        res.status(200).json(updatedBin);
    } catch (error) {
        console.error('Error updating bin by ID:', error);
        res.status(500).send(error.message);
    }
});

// Delete a bin by ID
router.delete('/deleteBin/:id', async (req, res) => {
    try {
        const deletedBin = await Bins.findByIdAndDelete(req.params.id);
        if (!deletedBin) {
            return res.status(404).send('Bin not found');
        }
        res.status(200).send('Bin deleted successfully');
    } catch (error) {
        console.error('Error deleting bin by ID:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;