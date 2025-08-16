import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, userController.me);
router.get(
    "/meHaveCourse/:courseId",
    authMiddleware,
    userController.meHaveCourse,
);
router.post("/createTicket", authMiddleware, userController.createTicket);
router.patch(
    "/continueTicket/:id",
    authMiddleware,
    userController.continueTicket,
);

export default router;
