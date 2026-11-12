import { Router } from "express";
import { getTrails, getTrail } from "../controllers/apiTrailController";

const router = Router();

router.get("/trails", getTrails);

router.get("/trails/:slug", getTrail);

export default router;
