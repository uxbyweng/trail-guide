import { Router } from "express";
import { showTrails } from "../controllers/trailController";

const router = Router();

router.get("/", showTrails);

export default router;
