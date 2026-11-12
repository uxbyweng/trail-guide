import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";

export const getTrails = (req: Request, res: Response) => {
    const trails = getAllTrails();
    res.json(trails);
};

export const getTrail = (req: Request<{ slug: string }>, res: Response) => {
    const trail = getTrailBySlug(req.params.slug);

    if (!trail) {
        res.status(404).json({ error: `There is no trail with the name '${req.params.slug}'. Please try another trailname.` });
        return;
    }

    res.json(trail);
};
