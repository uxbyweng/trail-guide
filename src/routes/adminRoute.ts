import { Router } from "express";
// import { showAdmin } from "../controllers/adminController";
import { showTrails } from "../controllers/trailController";

const router = Router();
router.get("/index.html", showTrails);

export default router;
