import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/userRoutes.js";
import financeRouter from "./routes/financeRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
dotenv.config();

app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser())

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
}))
app.use('/api/auth',authRouter)
app.use('/api/finances',financeRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})
