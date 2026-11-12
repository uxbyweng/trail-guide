import type { Request, Response } from "express";
// import { getTrailsByRegionId } from "../models/regionModel";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";

export const getRegions = (req: Request, res: Response) => {
    const regions = getAllRegions();
    res.json(regions);
};

export const getRegion = (req: Request<{ slug: string }>, res: Response) => {
    const region = getRegionBySlug(req.params.slug);

    if (!region) {
        res.status(404).json({ error: `There is no region with the name '${req.params.slug}'. Please try another region.` });
        return;
    }

    res.json(region);
};
