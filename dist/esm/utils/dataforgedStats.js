import { encounterStats } from "./encounterStats.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export function dataforgedStats(gamespace, { assets, encounters, moves, oracles, setting_truths }) {
    const oracleTables = JSONPath({ path: "$..Oracles[*].Table", json: oracles });
    const oracleSubtables = JSONPath({ json: oracleTables, path: "$..Subtable" });
    const assetCount = _.sum(assets.map(item => item.Assets.length));
    const moveCount = _.sum(moves.map(item => item.Moves.length));
    return `${assetCount} assets comprising ${assets.length} types,
    ${encounterStats(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleTables.length + oracleSubtables.length} oracle tables in ${oracles.length} categories,
    and ${setting_truths.length} setting truth categories.`;
}
//# sourceMappingURL=dataforgedStats.js.map