import { Router } from "express";
import * as surveyController from "./survey.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, surveyController.createSurvey);

export default router;
