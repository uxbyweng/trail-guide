import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import {
    getAllTrails,
    getTrailBySlug,
    addTrail,
    updateTrail as updateTrailInModel,
    deleteTrail as deleteTrailFromModel,
    type Trail,
    type TrailEditableFields,
} from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";
import { slugify } from "../utils/slugify-utils";

const DIFFICULTIES: Trail["difficulty"][] = ["easy", "moderate", "hard"];

const readSlug = (req: Request): string => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    return slug ?? "";
};

// formular checken
const readTrailForm = (body: any) => {
    body = body ?? {};
    const values: TrailEditableFields = {
        title: String(body.title ?? "").trim(),
        image_url: String(body.image_url ?? "").trim(),
        difficulty: String(body.difficulty ?? "") as Trail["difficulty"],
        distance_km: Number(body.distance_km),
        region_id: Number(body.region_id),
        // Every description goes through sanitize-html before it reaches the model
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

    // speichert was user eingibt
    const formData = { ...values, distance_km: body.distance_km };

    return { values, errors, formData };
};

export const showAdmin = (req: Request, res: Response) => {
    res.render("admin/index", { trails: getAllTrails() });
};

// leeres formular anzeigen
export const showNewTrailForm = (req: Request, res: Response) => {
    res.render("admin/adminForm", { trail: {}, errors: [], heading: "Add a new trail", action: "/admin/trails" });
};

// neues formular auswerten
export const createTrail = (req: Request, res: Response) => {
    const { values, errors, formData } = readTrailForm(req.body);

    // slug aus titel bauen
    const slug = slugify(values.title);
    if (values.title && !slug) errors.push("Title must contain letters or numbers.");

    // im fehlerfall eingaben nicht vergessen
    if (errors.length > 0) {
        res.status(400).render("admin/adminForm", {
            trail: formData,
            errors,
            heading: "Add a new trail",
            action: "/admin/trails",
        });
        return;
    }

    // speichern
    addTrail({ ...values, slug, created_at: Math.floor(Date.now() / 1000) });
    res.redirect("/admin");
};

// formular zum bearbeiten anzeigen (vorausgefüllt mit daten aus der db)
export const showEditTrailForm = (req: Request, res: Response) => {
    const slug = readSlug(req);
    const trail = getTrailBySlug(slug);

    if (!trail) {
        res.status(404).render("404", { what: "trail", trails: getAllTrails() });
        return;
    }

    res.render("admin/adminForm", {
        trail,
        errors: [],
        heading: "Edit trail",
        action: `/admin/trails/${trail.slug}/edit`,
    });
};

// bearbeitetes formular auswerten
export const updateTrail = (req: Request, res: Response) => {
    const slug = readSlug(req);
    if (!getTrailBySlug(slug)) {
        res.status(404).render("404", { what: "trail", trails: getAllTrails() });
        return;
    }

    const { values, errors, formData } = readTrailForm(req.body);

    if (errors.length > 0) {
        res.status(400).render("admin/adminForm", {
            trail: formData,
            errors,
            heading: "Edit trail",
            action: `/admin/trails/${slug}/edit`,
        });
        return;
    }

    // der slug bleibt unverändert
    updateTrailInModel(slug, values);
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
