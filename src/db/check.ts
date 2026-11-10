/* SCRIPT NUR ZUM TESTEN */

import { connectDB, closeDB } from "./database";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailModel";

connectDB();

console.log("Alle Regionen:");
console.table(getAllRegions());

const dolomites = getRegionBySlug("dolomites");
console.log("Region 'dolomites':", dolomites);

console.log("Region 'xddffdd':", getRegionBySlug("xddffdd"));

// zeige alle trails mit dem slug "dolomites"
if (dolomites) {
    console.log("Trails der Dolomites:");
    console.table(
        getTrailsByRegionId(dolomites.id).map((t) => ({
            title: t.title,
            region: t.region_name,
            km: t.distance_km,
        })),
    );
}

closeDB();
