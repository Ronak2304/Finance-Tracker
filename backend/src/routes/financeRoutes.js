import express from "express";
import protectRoute from "../middleware/middleware.js";
import { addFinance, deleteFinance, updateFinance, viewFinance } from "../controller/financeController.js";

const router = express.Router();
router.post("/addFinance",protectRoute,addFinance);
router.get("/getFinance",protectRoute,viewFinance);
router.delete("/deleteFinance/:finId", protectRoute, deleteFinance);
router.put("/updateFinance/:finId", protectRoute, updateFinance);

export default router;