import { Router } from "express";
import { requireApiKey } from "../middleware/apiKey";
import { getTrails, getTrail, createTrail, deleteTrail } from "../controllers/apiTrailController";
import { getRegions, getRegion } from "../controllers/apiRegionController";

const router = Router();

router.get("/trails", getTrails);

router.get("/trails/:slug", getTrail);

router.get("/regions", getRegions);

router.get("/regions/:slug", getRegion);

router.post("/trails", requireApiKey, createTrail);

router.delete("/trails/:id", requireApiKey, deleteTrail);

export default router;
