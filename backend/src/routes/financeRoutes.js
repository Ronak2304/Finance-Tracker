import express from "express";
import protectRoute from "../middleware/middleware.js";
import { addFinance, viewFinance } from "../controller/financeController.js";

const router = express.Router();
router.post("/addFinance",protectRoute,addFinance);
router.get("/getFinance",protectRoute,viewFinance);

export default router;