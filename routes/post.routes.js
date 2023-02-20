const express=require("express")
const { PostModel } = require("../model/post.model")

const PostRouter=express.Router()

PostRouter.get("/",async(req,res)=>{
    const id=req.body.userId
    const query=req.query
    // if(query.device1){
    //     for(let key in query){
    //         key=device
    //     }
    // }


try {
    const userspost=await PostModel.find({userId:id,...query})
    res.send(userspost)
} catch (error) {
    res.send({"msg":"something went wrong"})
}
})
PostRouter.get("/top",async(req,res)=>{
    const id=req.body.userId
    
try {
    const userspost=await PostModel.find({userId:id}).sort({"no_if_comments":-1}).limit(1)
    res.send(userspost)
} catch (error) {
    res.send({"msg":"something went wrong"})
}
})
PostRouter.post("/create",async(req,res)=>{


    try {
        const post=new PostModel(req.body)
        await post.save()
        res.send({"msg":"new post added"})


        
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})

PostRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
       await PostModel.findByIdAndDelete({_id:id})
        res.send({"msg":"post deleted"})


        
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})
PostRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    try {
       await PostModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"post updated"})


        
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})

module.exports={
    PostRouter
}