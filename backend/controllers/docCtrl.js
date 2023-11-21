const doctorsSchema = require("../models/doctorsSchema");

const authController = async(req,res) =>{
    try{
        const user = await doctorsSchema.findOne({_id:req.body.userId})
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
                    fname:user.name,
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

module.exports = {authController}