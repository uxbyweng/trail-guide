import type { Request, Response } from "express";
import { getAllTrails } from "../models/trailModel";
import { formatDate } from "../utils/date-utils";

export const showTrails = (req: Request, res: Response) => {
    const trails = getAllTrails().map((t) => ({
        ...t,
        createdAt: formatDate(t.created_at),
    }));
    res.render("index", { trails });
};
