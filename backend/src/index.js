import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/userRoutes.js";
import financeRouter from "./routes/financeRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

const app = express();
dotenv.config();

const __dirname = path.resolve();
app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser())

app.use(cors({
    origin: [
        'https://finance-tracker-frontend-qpxx.onrender.com',
        'http://localhost:5173' // for local dev
    ],
    credentials: true
}));

app.use('/api/auth',authRouter)
app.use('/api/finances',financeRouter)
import fs from 'fs'

const distPath = path.join(__dirname, '../../frontend/dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})
