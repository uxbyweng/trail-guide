import type { NextFunction, Request, Response } from "express";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Pfad vom Projekt Root
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "logs.txt");

// erstelle Logfiles einmal beim Start
export async function ensureLogFile(): Promise<void> {
    await mkdir(LOG_DIR, { recursive: true });
}

// Füge eine Log-Eintrag-Zeile hinzu ohne die davorige zu uberschrieben
async function addLogMessage(message: string): Promise<void> {
    await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}

export function logger(req: Request, res: Response, next: NextFunction) {
    // Log Eintrag speichern nach dem die Antwort (Response) final ist
    res.on("finish", () => {
        const logEntry = [new Date().toISOString(), req.method, req.ip, req.originalUrl, res.statusCode].join(" ");

        // Fehler mit catch auffangen so dass server nicht crasht
        addLogMessage(logEntry).catch((err) => console.error("Logging failed:", err));
    });

    next(); // danach zum nächsten Prozess weiterleiten
}
