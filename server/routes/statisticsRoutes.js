const express = require('express');
const router = express.Router();
const Statistics = require('../models/statistics');


// GET request for getting statistics
router.get('/getStatistics', async (req, res) => {
    try {
        const statisticsData = await Statistics.findOne();
        if (statisticsData) {
            res.status(200).json(statisticsData);
        } else {
            console.error('No statistics found');
            res.status(404).send('No statistics found');
        }
    } catch (error) {
        console.error('Error getting statistics data:', error);
        res.status(500).send(error.message);
    }
});

// POST request for updating statistics
router.post('/updateStatistics', async (req, res) => {
    try {
        const updatedData = req.body;
        await Statistics.updateOne({}, updatedData, { upsert: true });
        res.status(200).send('Statistics data updated successfully');
    } catch (error) {
        console.error('Error updating statistics data:', error);
        res.status(500).send(error.message);
    }
});



// // PUT request to insert/update statistics data
// router.put('/updateStatistics', async (req, res) => {
//     try {
//         const existingData = await Statistics.findOne();
//         const realisticData = {
//             registeredUser: 5000,
//             openIssues: 25,
//             inProgressIssues: 15,
//             closedIssues: 50,
//             totalBins: 300,
//             emptyBins: 100,
//             halfBins: 80,
//             fullBins: 120,
//             collectedBins: 150,
//             collectionRate: 70,
//             totalDrivers: 50,
//             totalVehicles: 40,
//             activeVehicles: 30,
//             repairedVehicles: 10,
//             activeUsersWeeklyArray: [500, 600, 550, 580, 620, 590, 600], // Assuming weekly data
//             activeUsersMonthlyArray: [5000, 5200, 5100, 4900, 4800, 5300, 5400, 5600, 5500, 5200, 5000, 4900], // Assuming monthly data
//             satisfactionRateArray: [80, 85, 82, 88, 90, 85, 87, 81, 92, 84, 88, 85], // Assuming weekly data
//             binLevelArray: [
//                 {
//                     binId: 1,
//                     fillLevels: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
//                 },
//                 {
//                     binId: 2,
//                     fillLevels: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
//                 },
//                 // Add more bin data as needed
//             ],
//         };


//         if (existingData) {
//             // If data exists, update it
//             await Statistics.updateOne({}, realisticData);
//             res.status(200).send('Statistics data updated successfully');
//         } else {
//             // If no data exists, create a new record
//             const newStatistics = new Statistics(realisticData);
//             await newStatistics.save();
//             res.status(200).send('Statistics data inserted successfully');
//         }
//     } catch (error) {
//         console.error('Error updating/inserting statistics data:', error);
//         res.status(500).send(error.message);
//     }
// });

module.exports = router;