import { Gamespace } from "../json_out/index.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export function dataforgedStats(gamespace, { assets, encounters, moves, oracles, truths }) {
    var _a;
    const assetCount = _.sum(assets.map(item => item.Assets.length));
    const moveCount = _.sum(moves.map(item => item.Moves.length));
    return `${assetCount} assets comprising ${assets.length} types,
    ${encounterStats(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleStats(oracles)},
    and ${(_a = truths === null || truths === void 0 ? void 0 : truths.length) !== null && _a !== void 0 ? _a : 0} setting truth categories.`;
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
    var _a;
    let text;
    switch (gamespace) {
        case Gamespace.Starforged:
            {
                const encounterCount = json.length;
                const variantCount = (_a = _.sum(json.map(enc => { var _a; return (_a = enc.Variants) === null || _a === void 0 ? void 0 : _a.length; }))) !== null && _a !== void 0 ? _a : 0;
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