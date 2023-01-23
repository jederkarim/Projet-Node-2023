
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, 'FirstName field is required']
    },
    LastName: {
        type: String,
        required: [true, 'LastName field is required']
    },
    Email: {
        type: String,
        required: [true, 'Email field is required']
    },
    event: { type: Schema.Types.ObjectId, ref: 'event' }
}, {
    timestamps: true,
    versionKey: false
});

const Reservation = mongoose.model('reservation', reservationSchema, 'reservation');
module.exports = Reservation;