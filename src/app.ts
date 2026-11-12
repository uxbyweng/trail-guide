import { connectDB, closeDB } from "./db/database";
import { loadRegions } from "./middleware/regions";
import { logger, ensureLogFile } from "./middleware/logger";
import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import trailRouter from "./routes/trailRoute";
import regionRouter from "./routes/regionRoute";
import adminRouter from "./routes/adminRoute";
import apiRouter from "./routes/apiRoute";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

await ensureLogFile(); // leg Verzeichnis '/logs' an, falls es fehlt

// nunjucks.configure(path.join(projectRoot, "views"), { autoescape: true, express: app });
nunjucks.configure(path.join(projectRoot, "views"), {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== "production",
});
app.set("view engine", "html");
app.locals.year = new Date().getFullYear(); // steht dadurch als {{ year }} in jedem nunjucks templatee zur verfügung
app.use(express.static(path.join(projectRoot, "public")));
app.use(express.urlencoded({ extended: true })); // Formulardaten lesen (req.body)
app.use(express.json());
app.use(logger); // Logger einbinden (vor den Routes)
app.use(loadRegions);

app.use("/", trailRouter);
app.use("/", regionRouter);
app.use("/admin/", adminRouter);
app.use("/api/", apiRouter);

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
