import { Router } from "express";
import * as articleController from "./article.controller";

const router = Router();

router.get("/", articleController.getArticles);
router.get("/:slug", articleController.getArticle);

export default router;
