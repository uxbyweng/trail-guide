import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug, deleteTrail as deleteTrailFromModel } from "../models/trailModel";

const readSlug = (req: Request): string => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    return slug ?? "";
};

export const showAdmin = (req: Request, res: Response) => {
    res.render("admin/index", { trails: getAllTrails() });
};

export const deleteTrail = (req: Request, res: Response) => {
    const slug = readSlug(req);
    if (!getTrailBySlug(slug)) {
        res.status(404).send("Trail not found");
        return;
    }

    deleteTrailFromModel(slug);
    res.redirect("/admin");
};
