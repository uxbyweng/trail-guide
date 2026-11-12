import type { Request, Response, NextFunction } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
    const header = req.header("x-api-key");
    const key = process.env.API_KEY;
    if (!key || key !== header) {
        res.status(401).json({ error: "Missing API-Key in header x-api-key." });
        return;
    }

    next();
}
