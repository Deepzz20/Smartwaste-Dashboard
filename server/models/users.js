const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            default: 0,
            required: [true, 'Please add a User ID'],
            sequence: { type: Number, index: true },
            unique: true,
            index: true,
        },
        name: {
            type: String,
            default: "",
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            default: "",
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            default: "",
            required: [true, 'Please add a password'],
        },
        phoneNumber: {
            type: String,
            default: "",
            required: [true, 'Please add a phone number'],
        },
        location: {
            type: String,
            default: "",
            required: [true, 'Please add a location'],
        },
        issues: {
            type: Number,
            default: 0,
            required: [true, 'Please add the number of issues'],
        },
    },
    {
        versionKey: false,
        collection: "users",
    },
);

userSchema.plugin(AutoIncrement, { id: "userId_seq", inc_field: 'userId' });

const Users = mongoose.model('User', userSchema);
module.exports = Users;
