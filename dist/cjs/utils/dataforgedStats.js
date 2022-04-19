"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataforgedStats = void 0;
const encounterStats_js_1 = require("./encounterStats.js");
const jsonpath_plus_1 = require("jsonpath-plus");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
function dataforgedStats(gamespace, { assets, encounters, moves, oracles, setting_truths }) {
    const oracleTables = (0, jsonpath_plus_1.JSONPath)({ path: "$..Oracles[*].Table", json: oracles });
    const oracleSubtables = (0, jsonpath_plus_1.JSONPath)({ json: oracleTables, path: "$..Subtable" });
    const assetCount = lodash_es_1.default.sum(assets.map(item => item.Assets.length));
    const moveCount = lodash_es_1.default.sum(moves.map(item => item.Moves.length));
    return `${assetCount} assets comprising ${assets.length} types,
    ${(0, encounterStats_js_1.encounterStats)(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleTables.length + oracleSubtables.length} oracle tables in ${oracles.length} categories,
    and ${setting_truths.length} setting truth categories.`;
}
exports.dataforgedStats = dataforgedStats;
//# sourceMappingURL=dataforgedStats.js.map