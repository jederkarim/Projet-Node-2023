const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name field is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    role: {
        type: String,
        default: 'user'
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('user', UserSchema,'user');