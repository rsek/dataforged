import { DelveCardType, Gamespace } from "../schema_json";
import { buildAssets } from "./buildAssets.js";
import { buildEncounters } from "./buildEncounters.js";
import { buildMoves } from "./buildMoves.js";
import { buildOracles } from "./buildOracles.js";
import { buildTruths } from "./buildTruths.js";
import { dataforgedStats } from "./dataforgedStats.js";
import { buildLog } from "./logging/buildLog.js";
import { buildDelveSiteCards } from "./buildDelveSiteCards.js";
import { buildIronlandsRegions } from "./buildIronswornRegions.js";
/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(gamespace = Gamespace.Starforged) {
    buildLog(buildDataforged, `Building Dataforged for ${gamespace}...`);
    let data;
    switch (gamespace) {
        case Gamespace.Starforged: {
            data = {
                // $schema: "./schema.json",
                "Asset Types": buildAssets(gamespace),
                Encounters: buildEncounters(gamespace),
                "Move Categories": buildMoves(gamespace),
                "Oracle Sets": buildOracles(gamespace),
                "Setting Truths": buildTruths(gamespace)
            };
            break;
        }
        case Gamespace.Ironsworn: {
            data = {
                // $schema: "./schema.json",
                "Asset Types": buildAssets(gamespace),
                Encounters: buildEncounters(gamespace),
                "Move Categories": buildMoves(gamespace),
                "Oracle Sets": buildOracles(gamespace),
                "Setting Truths": buildTruths(gamespace),
                "Site Themes": buildDelveSiteCards(DelveCardType.Theme),
                "Site Domains": buildDelveSiteCards(DelveCardType.Domain),
                Regions: buildIronlandsRegions(),
                // Rarities
                // Delve Sites (the sample ones from Delve)
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