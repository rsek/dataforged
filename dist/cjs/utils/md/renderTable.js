"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTable = void 0;
const longestLength_js_1 = require("./longestLength.js");
const transpose2dArray_js_1 = require("./transpose2dArray.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Renders an object array as a markdown table.
 */
function renderTable(rowDataArray) {
    const tableBody = rowDataArray.map(row => Object.values(row));
    const tableHeaderText = Object.keys(rowDataArray[0]);
    let table = [tableHeaderText, ...tableBody];
    const columnWidths = (0, transpose2dArray_js_1.transpose2dArray)(table).map(col => (0, longestLength_js_1.lengthOfLongest)(col));
    const colIsCentered = ((0, transpose2dArray_js_1.transpose2dArray)(tableBody)).map(col => col.every(cell => cell.match(/^[^A-z]+$/) !== null));
    table = table.map((row) => row.map((cell, colIndex) => cell.padEnd(columnWidths[colIndex], " ")));
    let rowStrings = table.map(row => row.join(" | "));
    const headBorder = rowStrings[0].split("|").map((colContent, colIndex) => {
        let border = lodash_es_1.default.repeat("-", colContent.length);
        if (colIsCentered[colIndex]) {
            border = border.replaceAll(/^-(-+)-$/g, ":$1:");
        }
        return border;
    })
        .join("|");
    rowStrings.splice(1, 0, headBorder);
    rowStrings = rowStrings.map(row => row.trimEnd());
    return rowStrings.join("\n");
}
exports.renderTable = renderTable;
// let oracleData = buildOracles();
// let testOracle = getOracleById(oracleData, "Oracles/Creatures/Basic Form");
// // console.log("found oracle:", testOracle);
// let extract = extractColumnData(testOracle);
// console.log(renderTable(extract));
//# sourceMappingURL=renderTable.js.map