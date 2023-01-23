
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: [true, 'Name of Event field is required']
    },
    eventDescription: {
        type: String,
        required: [true, 'EventDescription field is required']
    },
    typeEvent: {
        type: String,
        required: [true, 'Type of Event field is required']
    },
    startDate: {
        type: String,
        required: [true, 'StartDate field is required']
    },
    endDate: {
        type: String,
        required: [true, 'EndDate field is required']
    },
    startTime: {
        type: String,
        required: [true, 'StartDate field is required']
    },
    endTime: {
        type: String,
        required: [true, 'EndDate field is required']
    },
    locationEvent: {
        type: String,
        required: [true, 'Location field is required']
    },
    price: {
        type: String,
        required: [true, 'Price field is required']
    },
    // picture:{
    //     title:String,
    //     file:Buffer
    // },
    picture:String,
         
},{
    timestamps: true,
    versionKey: false
});

const Event = mongoose.model('event',eventSchema,'event');
module.exports = Event;