"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractColumnData = void 0;
const badJsonError_js_1 = require("../logging/badJsonError.js");
const getTableByOracleId_js_1 = require("./getTableByOracleId.js");
function extractColumnData(oracle) {
    const newTableRows = [];
    const rollCols = oracle.Display.Table["Roll columns"];
    rollCols.forEach((col, colIndex) => {
        // console.log("[extractColumnData] id:",col);
        const table = (0, getTableByOracleId_js_1.getTableByOracleId)(oracle, col["Use content from"]);
        table.forEach((rowData, rowIndex) => {
            if (!table) {
                throw (0, badJsonError_js_1.badJsonError)(extractColumnData);
            }
            if (!newTableRows[rowIndex]) {
                newTableRows.push({});
            }
            const currentTableRow = newTableRows[rowIndex];
            const newRowText = (rowData.Floor === null || rowData.Ceiling === null) ? "--" : rowData.Floor === rowData.Ceiling ? `${rowData.Ceiling}` : `${rowData.Floor}–${rowData.Ceiling}`;
            currentTableRow[col.Label] = newRowText;
        });
    });
    const resultCols = oracle.Display.Table["Result columns"];
    resultCols.forEach((col, colIndex) => {
        const table = (0, getTableByOracleId_js_1.getTableByOracleId)(oracle, col["Use content from"]);
        if (!table) {
            throw (0, badJsonError_js_1.badJsonError)(extractColumnData);
        }
        // console.log("found table:", table);
        table.forEach((rowData, rowIndex) => {
            const currentTableRow = newTableRows[rowIndex];
            const newRowText = rowData[col.Key];
            if (typeof rowData[col.Key] !== "string") {
                throw (0, badJsonError_js_1.badJsonError)(extractColumnData, newRowText);
            }
            currentTableRow[col.Label] = newRowText;
        });
    });
    return newTableRows;
}
exports.extractColumnData = extractColumnData;
//# sourceMappingURL=extractColumnData.js.map