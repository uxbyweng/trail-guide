import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { getAllTrails, getTrailBySlug, addTrail, deleteTrail as deleteTrailFromModel, type Trail } from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";
import { slugify } from "../utils/slugify-utils";

const DIFFICULTIES: Trail["difficulty"][] = ["easy", "moderate", "hard"];

const readSlug = (req: Request): string => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    return slug ?? "";
};

export const showAdmin = (req: Request, res: Response) => {
    res.render("admin/index", { trails: getAllTrails() });
};

// leeres formular anzeigen
export const showNewTrailForm = (req: Request, res: Response) => {
    res.render("admin/adminForm", { trail: {}, errors: [] });
};

// formular checken
export const createTrail = (req: Request, res: Response) => {
    const body = req.body ?? {};
    const title = String(body.title ?? "").trim();
    const imageUrl = String(body.image_url ?? "").trim();
    const difficulty = String(body.difficulty ?? "");
    const distanceKm = Number(body.distance_km);
    const regionId = Number(body.region_id);
    const description = sanitizeHtml(String(body.description ?? "")).trim();

    // eingabe prüfen
    const errors: string[] = [];
    if (!title) errors.push("Title is required.");
    if (!imageUrl) errors.push("URL is required.");
    if (!DIFFICULTIES.includes(difficulty as Trail["difficulty"])) errors.push("Please choose a difficulty.");
    if (!Number.isFinite(distanceKm) || distanceKm <= 0) errors.push("Distance must be a number greater than 0.");
    if (!getAllRegions().some((r) => r.id === regionId)) errors.push("Please choose a region.");
    if (!description) errors.push("Description is required.");

    // slug aus titel bauen
    const slug = slugify(title);
    if (title && !slug) errors.push("Title must contain letters or numbers.");

    // im fehlerfall eingaben nicht vergessen
    if (errors.length > 0) {
        res.status(400).render("admin/adminForm", {
            trail: { title, image_url: imageUrl, distance_km: body.distance_km, region_id: regionId, difficulty, description },
            errors,
        });
        return;
    }

    // speichern
    addTrail({
        region_id: regionId,
        title,
        slug,
        difficulty: difficulty as Trail["difficulty"],
        distance_km: distanceKm,
        description,
        image_url: imageUrl || null,
        created_at: Math.floor(Date.now() / 1000),
    });
    res.redirect("/admin");
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
