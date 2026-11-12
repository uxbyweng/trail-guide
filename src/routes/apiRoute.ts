import { Router } from "express";
import { requireApiKey } from "../middleware/apiKey";
import { getTrails, getTrail, createTrail, deleteTrail, updateTrail } from "../controllers/apiTrailController";
import { getRegions, getRegionTrails } from "../controllers/apiRegionController";

const router = Router();

router.get("/trails", getTrails);

router.get("/trails/:slug", getTrail);

router.get("/regions", getRegions);

router.get("/regions/:slug/trails", getRegionTrails);

router.post("/trails", requireApiKey, createTrail);

router.put("/trails/:id", requireApiKey, updateTrail);

router.delete("/trails/:id", requireApiKey, deleteTrail);

export default router;
