import { getDB } from "../db/database";
import { slugify } from "../utils/slugify-utils";

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

export function getTrailById(id: number): TrailWithRegion | null {
    return getDB()
        .query<TrailWithRegion, [number]>(
            `
            SELECT t.*, r.name AS region_name, r.country AS region_country
            FROM trails t
            INNER JOIN regions r ON r.id = t.region_id
            WHERE t.id = ?
        `,
        )
        .get(id);
}

export function getTrailsByRegionId(regionId: number): TrailWithRegion[] {
    return getDB()
        .query<TrailWithRegion, [number]>(
            `
            SELECT t.*, r.name AS region_name, r.country AS region_country
            FROM trails t
            INNER JOIN regions r ON r.id = t.region_id
            WHERE t.region_id = ?
            ORDER BY t.created_at DESC
        `,
        )
        .all(regionId);
}

// Trail (slug) aus db entfernen
export function deleteTrail(slug: string): void {
    getDB().query("DELETE FROM trails WHERE slug = ?").run(slug);
}

// neuen trail hinzufügen
export function addTrail(trail: Omit<Trail, "region">) {
    getDB()
        .query(
            "INSERT INTO trails (region_id, title, slug, difficulty, description, image_url, createdAt) VALUES ($region_id, $title, $slug, $difficulty, $description, $image_url, $createdAt)",
        )
        .run({
            regionId: trail.region_id,
            title: trail.title,
            slug: trail.slug,
            difficulty: trail.difficulty,
            distance_km: trail.distance_km,
            description: trail.description,
            image_url: trail.image_url,
            created_at: trail.created_at,
        });
}
