const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const binSchema = mongoose.Schema(
    {
        binId: {
            type: Number,
            default: 0,
            required: [true, 'Please add a Bin ID'],
            sequence: { type: Number, index: true },
            unique: true,
            index: true,
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        coordinates: {
            type: String,
            required: [true, 'Please add coordinates'],
        },
        issues: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of issues'],
        },
        binSize: {
            type: String,
            default: "Small",
            required: [true, 'Please add a bin size'],
        },
        binLevel: {
            type: Number,
            default: 0,
            required: [true, 'Please add the bin level'],
        },
        pastFillLevels: [{
            type: Number
        }]
    },
    {
        versionKey: false,
        collection: "bins",
    },
);

binSchema.plugin(AutoIncrement, { id: "binId_seq", inc_field: 'binId' });

const Bins = mongoose.model('Bin', binSchema);
module.exports = Bins;
