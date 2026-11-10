import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { formatDate } from "../utils/date-utils";

export const showTrails = (req: Request, res: Response) => {
    const trails = getAllTrails().map((t) => ({
        ...t,
        createdAt: formatDate(t.created_at),
    }));
    res.render("index", { trails });
};

export const showTrail = (req: Request<{ slug: string }>, res: Response) => {
    const trail = getTrailBySlug(req.params.slug);

    if (!trail) {
        res.status(404).render("404", { trails: getAllTrails() });
        return;
    }

    res.render("trail", { trail: { ...trail, createdAt: formatDate(trail.created_at) } });
};
