const jwt=require("jsonwebtoken")

const Authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    
   if(token){
    jwt.verify(token,"link",(err,decoded)=>{
        if(err){
            res.send({"msg":"something went wrong"})
        }else
        req.body.userId=decoded.userId
        next()
    })
   
   }else{
    res.send("err in token")
   }
}


module.exports={
    Authenticate
}