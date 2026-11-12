import type { Request, Response } from "express";
import { getAllTrails } from "../models/trailModel";

export const showAdmin = (req: Request, res: Response) => {
    res.render("admin/index", { trails: getAllTrails() });
};
