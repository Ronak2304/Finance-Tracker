import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser())
app.use('/api/auth',authRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})
