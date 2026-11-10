import { getDB } from "../db/database";

export interface Trail {
    id: number;
    region_id: number;
    title: string;
    slug: string;
    difficulty: "easy" | "moderate" | "hard";
    distance_km: number;
    description: string | null;
    image_url: string | null;
    created_at: number;
}

// trail joined
export interface TrailWithRegion extends Trail {
    region_name: string;
    region_country: string;
}

export function getAllTrails(): TrailWithRegion[] {
    return getDB()
        .query<TrailWithRegion, []>(
            `
            SELECT t.*, r.name AS region_name, r.country AS region_country
            FROM trails t
            INNER JOIN regions r ON r.id = t.region_id
            ORDER BY t.created_at DESC
        `,
        )
        .all();
}

export function getTrailBySlug(slug: string): TrailWithRegion | null {
    return getDB()
        .query<TrailWithRegion, [string]>(
            `
            SELECT t.*, r.name AS region_name, r.country AS region_country
            FROM trails t
            INNER JOIN regions r ON r.id = t.region_id
            WHERE t.slug = ?
        `,
        )
        .get(slug);
}

export function getTrailsByRegionId(regionId: number): TrailWithRegion[] {
    return getDB()
        .query<TrailWithRegion, [number]>(
            `
            SELECT t.*, r.name AS region_name, r.country AS region_country
            FROM trails t
            INNER JOIN regions r ON r.id = t.region_id
            WHERE t.region_id = ?
        `,
        )
        .all(regionId);
}
