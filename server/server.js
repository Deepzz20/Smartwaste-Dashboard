const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from a .env file
require('dotenv').config();


// Import the routes
const adminRoutes = require('./routes/adminRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const binRoutes = require('./routes/binRoutes');
const driverRoutes = require('./routes/driverRoutes');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const algoRoutes = require('./routes/algorithmRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());


// Use the routes
app.use('/admin', adminRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/bins', binRoutes);
app.use('/drivers', driverRoutes);
app.use('/users', userRoutes);
app.use('/issues', issueRoutes);
app.use('/algo', algoRoutes);


// Connect to MongoDB
mongoose.set('strictQuery', false);


(async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
})();


// Serve client
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});
