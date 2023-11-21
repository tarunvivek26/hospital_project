const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    message:{
        type:String,
        required:[true,'Please enter your feedback']
    }
})

const feedbackModel = mongoose.model('feedback',feedbackSchema)
module.exports = feedbackModel