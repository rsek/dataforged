"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderOracleCategory = void 0;
const buildLog_js_1 = require("../logging/buildLog.js");
const renderOracle_js_1 = require("./renderOracle.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It takes an OracleCategory and returns a markdown string
 * @param oracleCat - OracleCategory
 * @param headerLevel - The header level to use for the category title.
 * @returns A string of markdown.
 */
function renderOracleCategory(oracleCat, headerLevel = 2) {
    (0, buildLog_js_1.buildLog)(renderOracleCategory, `Generating markdown for ${oracleCat.Display.Title}...`);
    const header = lodash_es_1.default.repeat("#", headerLevel) + " " + oracleCat.Display.Title;
    const items = [header];
    if (oracleCat.Description) {
        items.push(oracleCat.Description);
    }
    if (oracleCat.Oracles) {
        items.push(...oracleCat.Oracles.map(oracle => (0, renderOracle_js_1.renderOracle)(oracle, headerLevel + 1)).flat(1));
    }
    if (oracleCat.Categories) {
        items.push(...oracleCat.Categories.map(oracleSubCat => renderOracleCategory(oracleSubCat, headerLevel + 1)).flat(1));
    }
    return items.flat(1).join("\n\n");
}
exports.renderOracleCategory = renderOracleCategory;
//# sourceMappingURL=renderOracleCategory.js.map