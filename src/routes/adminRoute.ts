import { Router } from "express";
import { showAdmin, showNewTrailForm, createTrail, deleteTrail } from "../controllers/adminController";

const router = Router();

//  URL -> /admin
router.get("/", showAdmin);

//  URL -> /admin/trails/new (Formular)
router.get("/trails/new", showNewTrailForm);

//  URL -> /admin/trails (speichern)
router.post("/trails", createTrail);

//  URL -> /admin/trails/:slug/delete (löschen)
router.post("/trails/:slug/delete", deleteTrail);

export default router;
