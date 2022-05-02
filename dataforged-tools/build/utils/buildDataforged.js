import { Gamespace } from "../json_out/index.js";
import { buildAssets } from "./buildAssets.js";
import { buildEncounters } from "./buildEncounters.js";
import { buildMoves } from "./buildMoves.js";
import { buildOracles } from "./buildOracles.js";
import { buildTruths } from "./buildTruths.js";
import { dataforgedStats } from "./dataforgedStats.js";
import { buildLog } from "./logging/buildLog.js";
/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(gamespace = Gamespace.Starforged) {
    buildLog(buildDataforged, `Building Dataforged for ${gamespace}...`);
    const assets = buildAssets(gamespace);
    const encounters = buildEncounters(gamespace);
    const moves = buildMoves(gamespace);
    const oracles = buildOracles(gamespace);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const truths = buildTruths(gamespace);
    let data;
    switch (gamespace) {
        case Gamespace.Starforged: {
            data = {
                $schema: "./schema.json",
                assets,
                encounters: encounters,
                moves,
                oracles,
                truths
            };
            break;
        }
        case Gamespace.Ironsworn: {
            data = {
                $schema: "./schema.json",
                assets,
                encounters: encounters,
                moves,
                oracles,
                truths
            };
            break;
        }
        default:
            throw new Error();
    }
    buildLog(buildDataforged, `Finished building JSON for ${gamespace}:
    ${dataforgedStats(gamespace, data)}`);
    return data;
}
//# sourceMappingURL=buildDataforged.js.map