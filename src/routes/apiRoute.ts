import { Router } from "express";
import { getTrails } from "../controllers/apiTrailController";

const router = Router();

router.get("/", getTrails);

export default router;
