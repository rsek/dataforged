import { buildAssets } from "./buildAssets.js";
import { buildEncounters } from "./buildEncounters.js";
import { buildMoves } from "./buildMoves.js";
import { buildOracles } from "./buildOracles.js";
import { buildTruths } from "./buildTruths.js";
import { buildLog } from "./logging/buildLog.js";
/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(gamespace = "Starforged") {
    buildLog(buildDataforged, `Building Dataforged for ${gamespace}...`);
    const assets = buildAssets(gamespace);
    const encounters = buildEncounters(gamespace);
    const moves = buildMoves(gamespace);
    const oracles = buildOracles(gamespace);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const setting_truths = buildTruths(gamespace);
    buildLog(buildDataforged, `Finished building ${assets.length} assets, ${encounters.length} encounters, ${moves.length} moves, ${oracles.length} oracle categories, and ${setting_truths.length} setting truth categories for ${gamespace.toLocaleUpperCase()}.`);
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