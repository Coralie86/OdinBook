require("dotenv").config();
const express = require("express");
const path = require("node:path");
const authRouter = require("./routers/authRouter.js")
const cookieParser = require("cookie-parser");
const postRouter = require("./routers/postRouter.js")
const commentRouter = require("./routers/commentRouter.js")
const userRouter = require("./routers/userRouter.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


const PORT = 3000;
app.listen(PORT, (error) => {
    if(error) {
        throw error;
    }
    console.log(`Connected to OdinBook project on port ${PORT}`)
})

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/users', userRouter)

// app.use((err, req, res, next) => {
//     if(err.name === "JsonWebTokenError" || err.name === "TokenExpiredError"){
//         return res.status(401).json({message: "Token invalid, malformed or expired."})
//     }

//     if(err.status){
//         return res.status(err.status).json({ message: err.message })
//     }
    
//     res.status(500).json({message: "Internal server error."})
// })