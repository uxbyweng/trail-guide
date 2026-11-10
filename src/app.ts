import { connectDB, closeDB } from "./db/database";

import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import trailRouter from "./routes/trailRoute";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

nunjucks.configure(path.join(projectRoot, "views"), { autoescape: true, express: app });
app.set("view engine", "html");
app.use(express.static(path.join(projectRoot, "public")));
app.use("/", trailRouter);

// Datenbank verbinden
connectDB();
const port = Number(process.env.PORT) || 1234;

// Server starten
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Datenbank schließen
process.on("SIGINT", () => {
    closeDB();
    console.log(`Datenbank geschlossen `);
    process.exit(0);
});

process.on("SIGTERM", () => {
    closeDB();
    console.log(`Datenbank geschlossen `);
    process.exit(0);
});
