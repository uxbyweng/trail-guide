import { Router } from "express";
import { showAdmin, showNewTrailForm, createTrail, showEditTrailForm, updateTrail, deleteTrail } from "../controllers/adminController";

const router = Router();

//  URL -> /admin
router.get("/", showAdmin);

//  URL -> /admin/trails/new (formular für neuen trail)
router.get("/trails/new", showNewTrailForm);

//  URL -> /admin/trails (speichern)
router.post("/trails", createTrail);

//  URL -> /admin/trails/:slug/edit (formular zum editieren anzeigen)
router.get("/trails/:slug/edit", showEditTrailForm);

//  URL -> /admin/trails/:slug/edit (änderungen speichern)
router.post("/trails/:slug/edit", updateTrail);

//  URL -> /admin/trails/:slug/delete (löschen)
router.post("/trails/:slug/delete", deleteTrail);

export default router;
