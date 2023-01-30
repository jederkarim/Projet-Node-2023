const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'CompanyName field is required']
    },
    picture:String, 

    companyDescription: {
        type: String,
        required: [true, 'Description field is required']
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
    }
    
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('company', CompanySchema,'company');