import { Router } from "express";
import { showAdmin, deleteTrail } from "../controllers/adminController";

const router = Router();

//  URL -> /admin/index.html
router.get("/", showAdmin);

//  URL -> /admin/trails/:slug/delete
router.post("/trails/:slug/delete", deleteTrail);

export default router;
