import { Router } from "express";
import * as exam from "./exam.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, exam.getExams);
router.post("/", authMiddleware, exam.createExam);

export default router;
