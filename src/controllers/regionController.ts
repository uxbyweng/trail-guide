import type { Request, Response } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getAllTrails, getTrailsByRegionId } from "../models/trailModel";
import { formatDate } from "../utils/date-utils";

export const showRegions = (req: Request, res: Response) => {
    res.render("regions");
};

export const showRegion = (req: Request<{ slug: string }>, res: Response) => {
    const region = getRegionBySlug(req.params.slug);

    if (!region) {
        res.status(404).render("404", { what: "region", trails: getAllTrails() });
        return;
    }

    const trails = getTrailsByRegionId(region.id).map((t) => ({
        ...t,
        createdAt: formatDate(t.created_at),
    }));

    res.render("region", { region, trails });
};
