import { Router } from "express";
import * as adminController from "./admin.controller";
import { adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Auth
router.post("/login", adminController.login);

// Tickets
router.get("/tickets", adminMiddleware, adminController.getTickets);
router.patch(
    "/ticket/:id/answer",
    adminMiddleware,
    adminController.answerTicket,
);
router.patch("/ticket/:id/close", adminMiddleware, adminController.closeTicket);

// Users
router.get("/users", adminMiddleware, adminController.getUsers);
router.post("/users", adminMiddleware, adminController.createUser);
router.patch(
    "/users/:id/addCourses",
    adminMiddleware,
    adminController.addCoursesForUser,
);

// Comments
router.get("/comment", adminMiddleware, adminController.getComments);
router.delete("/comment/:id", adminMiddleware, adminController.deleteComment);
router.patch(
    "/comment/:id/approve",
    adminMiddleware,
    adminController.approveComment,
);

// Courses
router.get("/course", adminMiddleware, adminController.getCourses);
router.get("/course/:id", adminMiddleware, adminController.getCourse);
router.put("/course/:id", adminMiddleware, adminController.editCourse);
router.post("/course", adminMiddleware, adminController.createCourse);
router.patch(
    "/course/:id/addUsers",
    adminMiddleware,
    adminController.addUsersForCourse,
);

// Articles
router.get("/article", adminMiddleware, adminController.getArticles);
router.get("/article/:id", adminMiddleware, adminController.getArticle);
router.post("/article", adminMiddleware, adminController.createArticle);
router.put("/article/:id", adminMiddleware, adminController.editArticle);

// Episode
router.get("/episode", adminMiddleware, adminController.getEpisodes);
router.get("/episode/:id", adminMiddleware, adminController.getEpisode);
router.post("/episode", adminMiddleware, adminController.createEpisode);
router.put("/episode/:id", adminMiddleware, adminController.editEpisode);

// Survey
router.get("/survey", adminMiddleware, adminController.getSurveys);

export default router;
