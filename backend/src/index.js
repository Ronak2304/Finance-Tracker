import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/mongodb.js";

const app = express();
dotenv.config();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})
