import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { getAllTrails, getTrailBySlug, deleteTrail as deleteTrailFromModel, getTrailById, type Trail, type TrailEditableFields } from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";

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

const DIFFICULTIES: Trail["difficulty"][] = ["easy", "moderate", "hard"];

export function validateTrailBody(body: any) {
    body = body ?? {};

    const values: TrailEditableFields = {
        title: String(body.title ?? "").trim(),
        image_url: String(body.image_url ?? "").trim(),
        difficulty: String(body.difficulty ?? "") as Trail["difficulty"],
        distance_km: Number(body.distance_km),
        region_id: Number(body.region_id),
        description: sanitizeHtml(String(body.description ?? "")).trim(),
    };

    // eingabe prüfen
    const errors: string[] = [];
    if (!values.title) errors.push("Title is required.");
    if (!values.image_url) errors.push("URL is required.");
    if (!DIFFICULTIES.includes(values.difficulty)) errors.push("Please choose a difficulty.");
    if (!Number.isFinite(values.distance_km) || values.distance_km <= 0) errors.push("Distance must be a number greater than 0.");
    if (!getAllRegions().some((r) => r.id === values.region_id)) errors.push("Please choose a region.");
    if (!values.description) errors.push("Description is required.");

    return { values, errors };
}
