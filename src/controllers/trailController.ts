import { type Request, type Response } from "express";
import { showTrail } from "../models/trailModel";
import { slugify } from "../utils/utils";
import { formatDate } from "../utils/date-utils";

export const showTrails = (req: Request, res: Response) => {
    const distance_kmFilter = typeof req.query.distance_km === "string" ? req.query.distance_km.trim() : "";
    const sortBy = req.query.sort === "longest" ? "longest" : "shortest";
    const page = typeof req.query.page === "string" && Number.isInteger(Number(req.query.page)) ? Math.max(1, Number(req.query.page)) : 1;

    const { pagedTrails, currentPage, totalPages } = getTrails(distance_kmFilter, sortBy, page);

    const view = pagedTrails.map((trail) => ({
        ...trail,
        slug: slugify(trail.title),
        createdAt: formatDate(trail.createdAt),
    }));

    res.render("index.html", {
        recipes: view,
        controls: {
            cuisine: distance_kmFilter,
            sort: sortBy,
            page: currentPage,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    });
};
