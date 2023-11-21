const express = require("express");
const router = express.Router();
const doctorsSchema = require("../models/doctorsSchema");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middlewares/authMiddleware")
const {authController } = require('../controllers/docCtrl')


router.post("/create-doctor",async(req,res,next) =>{
    const existingUser = await doctorsSchema.findOne({email:req.body.email})
    if(existingUser){
        return res.status(200).json({message:'User Already Exists',success:true})
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    req.body.password = hashedPassword
    req.body.cpassword = hashedPassword
    const newDoc = new doctorsSchema(req.body)
    await newDoc.save()
    .then(result => {
        res.json(result)
    })
    .catch(
        err => {
            return next(err)
        }
    )
    })

router.get("/",(req,res,next) =>{
    doctorsSchema.find().then((data) =>{
        return res.json(data)
    }).catch((err) =>{
        return next(err)
    })

})

router.post("/login", (req, res) => {
    const {  email, password } = req.body;
    doctorsSchema.findOne({ email: email }).then((doctor) => {
      if (doctor) {
        if (bcrypt.compare(password,doctor.password)) {
          res.json("login successfull");
        } else {
          res.json("Password incorrect");
        }
      } else {
        res.json("No record exits");
      }
    });
  });



//Auth || Post
router.post('/getUserData',authMiddleware,authController)

router.delete("/delete-doctor/:id",async (req, res, next) => {
  const doctorId = req.params.id;
  console.log(doctorId)
  try {
      const deletedDoctorBooked = await doctorsSchema.findByIdAndDelete(doctorId);
      if (!deletedDoctorBooked) {
        return res.status(404).json({ message: 'DoctorBooked not found' });
      }
      res.status(204).end(); // No content for successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router
