const express = require('express');
const router = express.Router();

const tf = require('@tensorflow/tfjs-node');

const Bins = require('../models/bins');
const heldKarpAlgorithm = require('../utils/routeAlgo');


// Load LSTM models dynamically based on binId
const loadModels = async () => {
    const binModels = {};
    const fieldNames = Array.from({ length: 10 }, (_, i) => `bin-${String(i + 1).padStart(2, '0')}`);
    for (const binId of fieldNames) {
        const modelName = `${binId}_lstm_model`;
        const relativePath = `server/utils/lstm_models/${modelName}/model.json`;
        binModels[binId] = await tf.loadLayersModel(`file://${relativePath}`);
    }
    return binModels;
};

const prepareDataForPrediction = (bin) => {
    const tensorData = tf.tensor(bin.pastFillLevels).reshape([1, 7, 1]);
    return tensorData;
};

// Function to make predictions
const makePredictions = async (binModels, binData) => {
    const predictions = {};
    for (const bin of binData) {
        const binId = `bin-${String(bin.binId).padStart(2, '0')}`;
        const model = binModels[binId];

        // Check if model exists for the binId
        if (model) {
            const preparedData = prepareDataForPrediction(bin);
            const predictionTensor = await model.predict(preparedData);
            const predictionValue = predictionTensor.arraySync()[0][0];
            predictions[binId] = predictionValue;
        } else {
            console.warn(`Model not found for binId: ${binId}`);
        }
    }
    return predictions;
};

// Fetch bin data from the database in ascending order of binId
const fetchBinData = async () => {
    const bins = await Bins.find().sort({ binId: 1 });
    return bins;
};



const handlePredictionAndCollection = async () => {
    const binModels = await loadModels();
    const binData = await fetchBinData();
    const predictions = await makePredictions(binModels, binData);
    console.log("\nPredictions:\n", predictions, "\n");

    const binsToCollect = [];
    for (const bin of binData) {
        const binId = `bin-${String(bin.binId).padStart(2, '0')}`;
        const prediction = predictions[binId];

        // Check if prediction is above 50%
        if (prediction && prediction > 50) {
            const [latitude, longitude] = bin.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const binInfo = {
                    name: binId,
                    latitude,
                    longitude
                };
                console.log(`Adding ${binId} to bin collection`);
                binsToCollect.push(binInfo);
            } else {
                console.warn(`Invalid coordinates for ${binId}: ${bin.coordinates}`);
            }
        }
    }

    return binsToCollect;
};


const getBinCollectionCount = async () => {
    const binModels = await loadModels();
    const binData = await fetchBinData();
    const predictions = await makePredictions(binModels, binData);

    let binsToCollectCount = 0;
    for (const bin of binData) {
        const binId = `bin-${String(bin.binId).padStart(2, '0')}`;
        const prediction = predictions[binId];

        // Check if prediction is above 50%
        if (prediction && prediction > 50) {
            binsToCollectCount++;
        }
    }
    return binsToCollectCount;
};



// Get count for bins to collect
router.get('/getBinCount', async (req, res) => {
    try {
        const count = await getBinCollectionCount();
        res.status(200).json({ binCount: count });
    } catch (error) {
        console.error('Error getting route:', error);
        res.status(500).send(error.message);
    }
});


// Get all bins
router.post('/getRouteData', async (req, res) => {
    try {
        const binsToCollect = await handlePredictionAndCollection();

        const initialRoute = [req.body, ...binsToCollect];
        console.log("\nBefore Route Optimization (Bin Coordinates):\n", initialRoute, "\n");

        const optimizedRoute = heldKarpAlgorithm(initialRoute);
        console.log("\nAfter Route Optimization (Final Route):\n", optimizedRoute, "\n");

        res.status(200).json(optimizedRoute);
    } catch (error) {
        console.error('Error getting route:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
