"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderOracle = void 0;
const buildLog_js_1 = require("../logging/buildLog.js");
const extractColumnData_js_1 = require("./extractColumnData.js");
const renderTable_js_1 = require("./renderTable.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It takes an oracle and returns a markdown string.
 * @param oracle - Oracle, headerLevel = 3
 * @param headerLevel - The header level to use for the title.
 * @returns A string containing the markdown for the oracle.
 */
function renderOracle(oracle, headerLevel = 3) {
    if (oracle.Display["Column of"]) {
        return "";
    }
    (0, buildLog_js_1.buildLog)(renderOracle, `Generating markdown for ${oracle.Display.Title}...`);
    const header = lodash_es_1.default.repeat("#", headerLevel) + " " + (oracle.Display.Title);
    const items = [header];
    if (oracle.Description) {
        items.push(oracle.Description);
    }
    const tableData = (0, extractColumnData_js_1.extractColumnData)(oracle);
    const table = (0, renderTable_js_1.renderTable)(tableData);
    items.push(table);
    return items.join("\n\n");
}
exports.renderOracle = renderOracle;
//# sourceMappingURL=renderOracle.js.map