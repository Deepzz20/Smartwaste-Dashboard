const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const driverSchema = mongoose.Schema(
    {
        driverId: {
            type: Number,
            default: 0,
            required: [true, 'Please add a Driver ID'],
            sequence: { type: Number, index: true },
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        vehicleId: {
            type: String,
            required: [true, 'Please add a Vehicle ID'],
        },
    },
    {
        versionKey: false,
        collection: "drivers",
    },
);

driverSchema.plugin(AutoIncrement, { id: "driverId_seq", inc_field: 'driverId' });

const Drivers = mongoose.model('Driver', driverSchema);
module.exports = Drivers;
