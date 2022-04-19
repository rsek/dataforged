"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRowRolls = void 0;
const typescript_is_1 = require("typescript-is");
/**
 * Extracts the first two elements (floor and ceiling) of a raw row array.
 * @param row - IRowYaml | IRowRollYaml
 * @returns The first two elements of the array.
 */
function extractRowRolls(row) {
    if (!Array.isArray(row)) {
        throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
    }
    const output = row.filter((item) => (0, typescript_is_1.is)(item, object => { function _null(object) { ; if (object !== null)
        return {};
    else
        return null; } function _number(object) { ; if (typeof object !== "number")
        return {};
    else
        return null; } function su__null__number_eu(object) { if (object === null)
        return null;
    else
        return _number(object); } return su__null__number_eu(object); })).slice(0, 2);
    return output;
}
exports.extractRowRolls = extractRowRolls;
//# sourceMappingURL=extractRowRolls.js.map