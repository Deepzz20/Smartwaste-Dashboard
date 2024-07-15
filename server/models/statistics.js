const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema(
    {
        registeredUser: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of registered users'],
        },
        openIssues: {
            type: Number,
            default: 0,
            required: [true, 'Please add the total number of issues'],
        },
        inProgressIssues: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of active issues'],
        },
        closedIssues: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of resolved issues'],
        },
        totalBins: {
            type: Number,
            default: 0,
            required: [true, 'Please add the total number of bins'],
        },
        emptyBins: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of empty bins'],
        },
        halfBins: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of half-filled bins'],
        },
        fullBins: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of full bins'],
        },
        collectedBins: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of collected bins'],
        },
        collectionRate: {
            type: Number,
            default: 0,
            required: [true, 'Please add the collection rate'],
        },
        totalDrivers: {
            type: Number,
            default: 0,
            required: [true, 'Please add the total number of drivers'],
        },
        totalVehicles: {
            type: Number,
            default: 0,
            required: [true, 'Please add the total number of vehicles'],
        },
        repairedVehicles: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of repaired vehicles'],
        },
        activeUsersWeeklyArray: {
            type: [Number],
            default: Array(7).fill(0),
        },
        activeUsersMonthlyArray: {
            type: [Number],
            default: Array(12).fill(0),
        },
        satisfactionRateArray: {
            type: [Number],
            default: Array(12).fill(0),
        },
        binLevelArray: [{
            binId: {
                type: Number,
                required: [true, 'Please add a Bin ID'],
                unique: true,
                index: true,
            },
            fillLevels: {
                type: [Number],
                default: Array(30).fill(0),
            },
        }]
    },
    {
        versionKey: false,
        collection: 'statistics',
    },
);

const Statistics = mongoose.model('Statistic', statisticsSchema);
module.exports = Statistics;
