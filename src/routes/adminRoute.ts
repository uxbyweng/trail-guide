import { Router } from "express";
import { showAdmin } from "../controllers/adminController";

const router = Router();
router.get("/", showAdmin);

export default router;
