import { Router } from "express";
import { getTrails } from "../controllers/apiTrailController";

const router = Router();

router.get("/trails", getTrails);

export default router;
