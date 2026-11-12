import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug, deleteTrail as deleteTrailFromModel, getTrailById } from "../models/trailModel";

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

const readId = (req: Request): string => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    return id ?? "";
};

export const deleteTrail = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    const trail = getTrailById(id);

    if (!trail) {
        res.status(404).json({ error: `There is no trail with the id '${req.params.id}'. Please try another id.` });
        return;
    }

    deleteTrailFromModel(trail.slug);
    res.status(204).send();
};
