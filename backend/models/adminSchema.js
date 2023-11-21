const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
})

const adminModel = mongoose.model('admin',adminSchema)
module.exports = adminModel