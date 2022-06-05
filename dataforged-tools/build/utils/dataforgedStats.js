import { Gamespace } from "../json_out/index.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export function dataforgedStats(gamespace, { "Asset Types": assets, Encounters: encounters, "Move Categories": moves, "Oracle Categories": oracles, "Setting Truths": truths }) {
    const assetCount = _.sum(assets.map(item => item.Assets.length));
    const moveCount = _.sum(moves.map(item => item.Moves.length));
    return `${assetCount} assets comprising ${assets.length} types,
    ${encounterStats(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleStats(oracles)},
    and ${truths?.length ?? 0} setting truth categories.`;
}
/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export function oracleStats(oracles) {
    const oracleTables = JSONPath({ path: "$..Oracles[*][Table]", json: oracles });
    const oracleSubtables = JSONPath({ json: oracleTables, path: "$..Subtable" });
    return `${oracleTables.length + oracleSubtables.length} oracle tables in ${oracles.length} categories`;
}
/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export function encounterStats(gamespace, json) {
    let text;
    switch (gamespace) {
        case Gamespace.Starforged:
            {
                const encounterCount = json.length;
                const variantCount = _.sum(json.map(enc => enc.Variants?.length)) ?? 0;
                text = `${encounterCount} encounters (plus ${variantCount} encounter variants)`;
            }
            break;
        case Gamespace.Ironsworn:
            {
                const natureCount = json.length;
                const encounterCount = _.sum(json.map(enc => enc.Encounters.length));
                text = `${encounterCount} encounters across ${natureCount} nature types`;
            }
            break;
        default:
            throw new Error();
    }
    return text;
}
;
//# sourceMappingURL=dataforgedStats.js.map