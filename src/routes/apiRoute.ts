import { Router } from "express";
import { getTrails, getTrail } from "../controllers/apiTrailController";
import { getRegions } from "../controllers/apiRegionController";

const router = Router();

router.get("/trails", getTrails);

router.get("/trails/:slug", getTrail);

router.get("/regions", getRegions);

export default router;
