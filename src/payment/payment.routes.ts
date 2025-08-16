import { Router } from "express";
import * as paymentController from "./payment.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/request", authMiddleware, paymentController.requestPayment);
router.get("/verify", authMiddleware, paymentController.verifyPayment);

export default router;
