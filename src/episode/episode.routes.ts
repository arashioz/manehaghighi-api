import { Router } from "express";
import * as episode from "./episode.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/:courseId", authMiddleware, episode.getEpisodes);

export default router;
