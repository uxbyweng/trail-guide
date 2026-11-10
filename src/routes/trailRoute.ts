import { Router } from "express";
import { showTrails, showTrail } from "../controllers/trailController";

const router = Router();

router.get("/", showTrails);
router.get("/trails/:slug", showTrail);

export default router;
