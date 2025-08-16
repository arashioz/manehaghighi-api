import { Router } from "express";
import * as commentController from "./comment.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Course specific comments
router.get("/course/:courseId", commentController.getCourseComments);
router.post(
    "/course/:courseId",
    authMiddleware,
    commentController.createCourseComment,
);

// Article specific comments
router.get("/article/:articleId", commentController.getArticleComments);
router.post(
    "/article/:articleId",
    authMiddleware,
    commentController.createArticleComment,
);

export default router;
