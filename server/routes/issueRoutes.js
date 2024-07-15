const express = require('express');
const router = express.Router();
const Issues = require('../models/issues');

// Get all issues
router.get('/getAllIssues', async (req, res) => {
    try {
        const issues = await Issues.find().sort({ issueId: 1 });
        res.status(200).json(issues);
    } catch (error) {
        console.error('Error getting issues:', error);
        res.status(500).send(error.message);
    }
});

// Get a specific issue by ID
router.get('/getIssue/:id', async (req, res) => {
    try {
        const issue = await Issues.findById(req.params.id);
        if (!issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).json(issue);
    } catch (error) {
        console.error('Error getting issue by ID:', error);
        res.status(500).send(error.message);
    }
});

// Get all issues raised by a user email
router.get('/getIssuesByEmail/:email', async (req, res) => {
    try {
        const userIssues = await Issues.find({ email: req.params.email });
        res.status(200).json(userIssues);
    } catch (error) {
        console.error('Error getting issues by user email:', error);
        res.status(500).send(error.message);
    }
});

// Create a new issue
router.post('/createNewIssue', async (req, res) => {
    try {
        const newIssue = await Issues.create(req.body);
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error creating issue:', error);
        if (error.name === 'ValidationError') {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Update an issue by ID
router.put('/updateIssue/:id', async (req, res) => {
    try {
        const updatedIssue = await Issues.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIssue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).json(updatedIssue);
    } catch (error) {
        console.error('Error updating issue by ID:', error);
        res.status(500).send(error.message);
    }
});

// Delete an issue by ID
router.delete('/deleteIssue/:id', async (req, res) => {
    try {
        const deletedIssue = await Issues.findByIdAndDelete(req.params.id);
        if (!deletedIssue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send('Issue deleted successfully');
    } catch (error) {
        console.error('Error deleting issue by ID:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
