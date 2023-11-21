const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,'First name is required']
    },
    lname:{
        type:String,
        required:[true,'Last name is required']
    },
    number:{
        type:String,
        required:[true,'Number is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    dob:{
        type:String,
        required:[true,'date of birth is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    cpassword:{
        type:String,
        required:[true,'coniform password is required']
    },
})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel