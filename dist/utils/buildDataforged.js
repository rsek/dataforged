import { buildAssets } from "./buildAssets.js";
import { buildEncounters } from "./buildEncounters.js";
import { buildMoves } from "./buildMoves.js";
import { buildOracles } from "./buildOracles.js";
import { buildTruths } from "./buildTruths.js";
import { buildLog } from "./logging/buildLog.js";
export function buildDataforged() {
    buildLog(buildDataforged, "Building Dataforged...");
    const assets = buildAssets();
    const encounters = buildEncounters();
    const moves = buildMoves();
    const oracles = buildOracles();
    const setting_truths = buildTruths();
    buildLog(buildDataforged, `Finished building ${assets.length} assets, ${encounters.length} encounters, ${moves.length} moves, ${oracles.length} oracle categories, and ${setting_truths.length} setting truth categories.`);
    const data = {
        assets,
        encounters,
        moves,
        oracles,
        setting_truths
    };
    return data;
}
//# sourceMappingURL=buildDataforged.js.map