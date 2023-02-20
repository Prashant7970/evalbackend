const express=require("express")
const { UserModel } = require("../model/User.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const{name ,
        email ,
        gender,
        password ,
        age,
        city}=req.body
    try {
        const user= await UserModel.find({email:req.body.email})
        if(user.length>0){
            res.send({"msg":"User already exist, please login"})
        }else{
           bcrypt.hash(password,5,(err,hash)=>{
            if(err)console.log(err)
            const newuser=new UserModel({name,email,gender,age,city,password:hash})
            newuser.save()
            res.send({"msg":"new user registered"})
           })
           
        }
        
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err)console.log(err)
                if(result){
                    const token=jwt.sign({userId:user[0]._id},"link")
                    res.send({"msg":"login succesful","token":token})
                }else{
                    res.send({"msg":"wrong credentials"})
                }
            })

        }else{
            res.send({"msg":"please signup first"})  
        }
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }

})


module.exports={
    userRouter
}