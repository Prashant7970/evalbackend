const express=require("express")
const { connection } = require("./db")
const { Authenticate } = require("./middleware/Auth.middleware")
const cors=require("cors")
const { PostRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/user.routes")

require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome to my api")
})
app.use("/users",userRouter)
app.use("/posts",Authenticate,PostRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("cant connect to db")
    }
    console.log(`server is running at ${process.env.port}`)
})