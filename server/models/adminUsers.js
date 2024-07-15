const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const adminUserSchema = mongoose.Schema(
    {
        adminUserId: {
            type: Number,
            default: 0,
            required: [true, 'Please add a Admin User ID'],
            sequence: { type: Number, index: true },
            unique: true,
            index: true,
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add a last name'],
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
    },
    {
        versionKey: false,
        collection: "admin-users",
    }
);

adminUserSchema.plugin(AutoIncrement, { id: "adminUserId_seq", inc_field: 'adminUserId' });

const AdminUsers = mongoose.model('AdminUser', adminUserSchema);
module.exports = AdminUsers;
