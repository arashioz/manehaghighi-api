"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController = __importStar(require("./admin.controller"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Auth
router.post("/login", adminController.login);
// Tickets
router.get("/tickets", authMiddleware_1.adminMiddleware, adminController.getTickets);
router.patch("/ticket/:id/answer", authMiddleware_1.adminMiddleware, adminController.answerTicket);
router.patch("/ticket/:id/close", authMiddleware_1.adminMiddleware, adminController.closeTicket);
// Users
router.get("/users", authMiddleware_1.adminMiddleware, adminController.getUsers);
router.post("/users", authMiddleware_1.adminMiddleware, adminController.createUser);
router.patch("/users/:id/addCourses", authMiddleware_1.adminMiddleware, adminController.addCoursesForUser);
// Comments
router.get("/comment", authMiddleware_1.adminMiddleware, adminController.getComments);
router.delete("/comment/:id", authMiddleware_1.adminMiddleware, adminController.deleteComment);
router.patch("/comment/:id/approve", authMiddleware_1.adminMiddleware, adminController.approveComment);
// Courses
router.get("/course", authMiddleware_1.adminMiddleware, adminController.getCourses);
router.get("/course/:id", authMiddleware_1.adminMiddleware, adminController.getCourse);
router.put("/course/:id", authMiddleware_1.adminMiddleware, adminController.editCourse);
router.post("/course", authMiddleware_1.adminMiddleware, adminController.createCourse);
router.patch("/course/:id/addUsers", authMiddleware_1.adminMiddleware, adminController.addUsersForCourse);
// Articles
router.get("/article", authMiddleware_1.adminMiddleware, adminController.getArticles);
router.get("/article/:id", authMiddleware_1.adminMiddleware, adminController.getArticle);
router.post("/article", authMiddleware_1.adminMiddleware, adminController.createArticle);
router.put("/article/:id", authMiddleware_1.adminMiddleware, adminController.editArticle);
// Episode
router.get("/episode", authMiddleware_1.adminMiddleware, adminController.getEpisodes);
router.get("/episode/:id", authMiddleware_1.adminMiddleware, adminController.getEpisode);
router.post("/episode", authMiddleware_1.adminMiddleware, adminController.createEpisode);
router.put("/episode/:id", authMiddleware_1.adminMiddleware, adminController.editEpisode);
// Survey
router.get("/survey", authMiddleware_1.adminMiddleware, adminController.getSurveys);
exports.default = router;
