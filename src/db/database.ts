// 'bun:sqlite' -> wegen Windows arm64
import { Database } from "bun:sqlite";

// db bleibt solange undefindes bis db verbindung steht
let db: Database | undefined;

// db verbindung 'connectDB' muss nur einmal beim Start geöffnet werden
// und kann dann überall über getDB() verwenden werden
export function connectDB() {
    if (db) return db;

    // Datenbankpfad aus .env lesen
    const dbPath = process.env.DB_PATH;
    if (!dbPath) {
        throw new Error("DB_PATH is not set. Copy .env.example to .env.");
    }

    console.log("Datenbankverbindung wird geöffnet...");
    db = new Database(dbPath, { create: true, strict: true });

    // Fremdschlüssel-Prüfung einschalten (SQLite macht das nicht von allein)
    db.run("PRAGMA foreign_keys = ON");

    return db;
}

// Verbindung holen. Fehler, wenn connectDB() vergessen wurde.
export function getDB() {
    if (!db) {
        throw new Error("Keine Datenbankverbindung. Erst connectDB() aufrufen.");
    }
    return db;
}

// db schließen
export function closeDB() {
    if (!db) return;
    console.log("Datenbankverbindung wird geschlossen...");
    db.close();
    db = undefined;
}
