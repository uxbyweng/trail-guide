import { connectDB, closeDB } from "./database";

const sql = await Bun.file(import.meta.dir + "/seed.sql").text();

const db = connectDB();
db.exec(sql);

// console.log(db.query("SELECT * FROM trails").all());

console.table(
    db
        .query(
            "SELECT id, region_id, substr(title, 1, 12), substr(slug, 1, 12), difficulty, distance_km, substr(description, 1, 20), substr(image_url, -20) FROM trails",
        )
        .all(),
);

console.table(
    db
        .query(
            `
        SELECT t.title, t.difficulty, r.name AS region
        FROM trails t
        INNER JOIN regions r ON r.id = t.region_id
        ORDER BY t.created_at DESC
    `,
        )
        .all(),
);

console.log("Seed fertig:", db.query("SELECT COUNT(*) AS anzahl FROM regions").get());

const rows = db.query("SELECT id, region_id, title, slug, description FROM trails").all() as {
    id: number;
    region_id: number;
    title: string;
    slug: string;
    description: string;
}[];

console.table(rows.map((r) => ({ ...r, description: r.description.slice(0, 20) + "…" })));

closeDB();
