import type { Request, Response } from "express";
import { getAllRegions } from "../models/regionModel";

export const getRegions = (req: Request, res: Response) => {
    const regions = getAllRegions();
    res.json(regions);
};
