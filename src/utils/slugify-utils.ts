// aus einem text einen URL-tauglichen Slug erstellen
export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // alles außer a-z und 0-9 wird zu "-"
        .replace(/^-|-$/g, ""); // "-" am Anfang und Ende entfernen
}
