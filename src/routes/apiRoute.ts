import { Router } from "express";
import { getTrails, getTrail } from "../controllers/apiTrailController";
import { getRegions, getRegion } from "../controllers/apiRegionController";

const router = Router();

router.get("/trails", getTrails);

router.get("/trails/:slug", getTrail);

router.get("/regions", getRegions);

router.get("/regions/:slug", getRegion);

export default router;
