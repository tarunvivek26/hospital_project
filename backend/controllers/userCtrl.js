const userModel = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async(req,res) =>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).json({message:'User Already Exists',success:true})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        req.body.cpassword = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({message:`Register Sucessfully`,success:true});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:`Register Controller ${error.message}`})
    }

};

const loginController = async(req,res) =>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).json({message:`user not found`,success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:`Invalid Email or Password`,success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({message:`Login Success`,success:true,token})
    }catch(error){
        console.log(error)
        res.status(500).json({message:`Error in login CTRL ${error.message}`})
    }
}

const authController = async(req,res) =>{
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).json({
                message:"user not found",
                success:false
            })
        }else{
            res.status(200).json({
                message:"user found and authorization completed",
                success:true,
                data:{
                    fname:user.fname,
                    email:user.email,
                }
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"auth error",
            success:false,
            error
        })
    }
}

module.exports = {loginController,registerController,authController}