const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const issueSchema = mongoose.Schema(
    {
        issueId: {
            type: Number,
            default: 0,
            required: [true, 'Please add an Issue ID'],
            sequence: { type: Number, index: true },
            unique: true,
            index: true,
        },
        issueType: {
            type: String,
            default: "Other",
            required: [true, 'Please add an Issue Type'],
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        issueStatus: {
            type: String,
            default: "Open",
            required: [true, 'Please add a status'],
        },
        fullName: {
            type: String,
            required: [true, 'Please add a Full Name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
    },
    {
        versionKey: false,
        collection: "issues",
    },
);

issueSchema.plugin(AutoIncrement, { id: "issueId_seq", inc_field: 'issueId' });

const Issues = mongoose.model('Issue', issueSchema);
module.exports = Issues;
