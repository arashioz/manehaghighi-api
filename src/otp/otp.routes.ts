import { Router } from "express";
import * as otpController from "./otp.controller";

const router = Router();

router.post("/request", otpController.requestOTP);
router.post("/verify", otpController.verifyOTP);

export default router;
