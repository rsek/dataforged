import { buildAssets } from "../../dist/utils/buildAssets.js";
import { buildEncounters } from "../../dist/utils/buildEncounters.js";
import { buildMoves } from "../../dist/utils/buildMoves.js";
import { buildOracles } from "../../dist/utils/buildOracles.js";
import { buildTruths } from "../../dist/utils/buildTruths.js";
import { buildLog } from "../../dist/utils/logging/buildLog.js";
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