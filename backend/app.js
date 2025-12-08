import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,  // it allows the communication of frontend with backend only throgh this link
    credentials : true
}))

app.use(express.json({limit : "10kb"}))  //  express.json means json  data accept 
app.use(express.urlencoded({extended: true, limit: "10kb"})) // url data ko bhi accept karo
app.use((express.static("public"))) // public assets anyone can access it
app.use(cookieParser()) // cookie acceptance and send allowed

import userRouter from "./routes/user.routes.js"

app.use("/users", userRouter)

export {app}