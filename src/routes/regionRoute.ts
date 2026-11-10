import { Router } from "express";
import { showRegions, showRegion } from "../controllers/regionController";

const router = Router();

router.get("/regions", showRegions);
router.get("/regions/:slug", showRegion);

export default router;
