const express = require('express')
const userModel = require('../models/userSchema')
const {loginController, registerController,authController } = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware")

//router object
const router = express.Router()

//routes
//LOGIN || POST

router.post('/login',loginController)

 
//REGISTER || POST

router.post('/register',registerController);

//Auth || Post
router.post('/getUserData',authMiddleware,authController)

router.delete("/delete-user/:id",async (req, res, next) => {
    const userId = req.params.id;
    try {
        const deletedDoctorBooked = await userModel.findByIdAndDelete(userId);
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