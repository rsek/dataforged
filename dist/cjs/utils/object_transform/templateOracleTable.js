"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateOracleTable = void 0;
const extractRowContent_js_1 = require("./extractRowContent.js");
const extractRowRolls_js_1 = require("./extractRowRolls.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Given a table template object, extract the rolls and content into separate arrays and combine them into a single table.
 * @param template - The template object.
 * @returns A table of rows, where each row is a list of rolls and content.
 */
function templateOracleTable(template) {
    if (template.rolls.length !== template.content.length) {
        throw new Error("[buildTemplateTable] Arrays for template content and rolls have different lengths. Use [null, null] to represent a null roll range.");
    }
    const templateClone = lodash_es_1.default.cloneDeep(template);
    const rolls = templateClone.rolls.map(row => (0, extractRowRolls_js_1.extractRowRolls)(row));
    const content = templateClone.content.map(row => {
        if (Array.isArray(row)) {
            return (0, extractRowContent_js_1.extractRowContent)(row);
        }
        return [row];
    });
    const newTable = rolls.map((currentRoll, index) => {
        const newRow = [...currentRoll, ...content[index]];
        return newRow;
    });
    return newTable;
}
exports.templateOracleTable = templateOracleTable;
//# sourceMappingURL=templateOracleTable.js.map