import { Router } from "express";
import * as general from "./general.controller";

const router = Router();

router.get("/stats", general.getStats);

export default router;
