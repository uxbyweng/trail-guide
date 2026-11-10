import type { Request, Response, NextFunction } from "express";
import { getAllRegions } from "../models/regionModel";

export function loadRegions(req: Request, res: Response, next: NextFunction) {
    res.locals.regions = getAllRegions();
    next();
}
