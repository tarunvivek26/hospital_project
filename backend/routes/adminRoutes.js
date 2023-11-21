const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const doctorsModel = require('../models/doctorsSchema')
const userModel = require('../models/userSchema')
const feedbackModel = require('../models/feedbackSchema')
const router = express.Router();
const { getAllUsersController,getAllDoctorsController,feedbackCtrl,loginController } = require('../controllers/adminCtrl');

//GET METHOD || USERS
router.get('/getAllUsers',(req,res) =>{
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
//GET METHOD || DOCTORS
router.get('/getAllDoctors',(req,res) =>{
    doctorsModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
//POST METHOD || feedback
router.post('/feedback',feedbackCtrl)
//GET METHOD || FEEDBACK
router.get('/getAllFeedback',(req,res) =>{
    feedbackModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
//POST || LOGIN
router.post('/login',loginController)
module.exports = router