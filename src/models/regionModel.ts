import { getDB } from "../db/database";

export interface Region {
    id: number;
    name: string;
    slug: string;
    country: string;
    description: string | null;
}

export function getAllRegions(): Region[] {
    return getDB().query<Region, []>("SELECT * FROM regions ORDER BY name").all();
}

export function getRegionBySlug(slug: string): Region | null {
    return getDB().query<Region, [string]>("SELECT * FROM regions WHERE slug = ?").get(slug);
}
