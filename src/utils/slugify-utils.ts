// Macht aus einem Titel einen URL-tauglichen Slug,
// z. B. "Flowers: Nature's Muse" -> "flowers-nature-s-muse".
// Der Slug ist die "ID" eines Posts in der URL (/posts/<slug>), deshalb müssen Titel eindeutig sein.
export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // alles außer a-z und 0-9 wird zu "-"
        .replace(/^-|-$/g, ""); // "-" am Anfang und Ende entfernen
}
