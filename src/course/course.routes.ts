import { Router } from "express";
import * as courseController from "./course.controller";

const router = Router();

router.get("/", courseController.getCourses);
router.get("/:slug", courseController.getCourse);

export default router;
