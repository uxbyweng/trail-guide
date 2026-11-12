import type { Request, Response } from "express";

export const showAdmin = (req: Request, res: Response) => {
    res.render("admin");
};
