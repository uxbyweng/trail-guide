import type { Request, Response } from "express";
import { getAllTrails } from "../models/trailModel";

export const getTrails = (req: Request, res: Response) => {
    const trails = getAllTrails();
    res.json(trails);
};
