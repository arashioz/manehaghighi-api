import { Router } from "express";
import * as mobile from "./mobile.controller";

const router = Router();

router.get("/homeSlider", mobile.getHomeSlider);
router.get("/latestArticles", mobile.getLatestArticles);
router.get("/latestCourses", mobile.getLatestCourses);
router.get("/podcasts", mobile.getPodcasts);
router.get("/lives", mobile.getLives);

export default router;
