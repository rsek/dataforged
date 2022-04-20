import { badJsonError } from "../logging/badJsonError.js";
import { getTableByOracleId } from "./getTableByOracleId.js";
export function extractColumnData(oracle) {
    const newTableRows = [];
    const rollCols = oracle.Display.Table["Roll columns"];
    rollCols.forEach((col, colIndex) => {
        // console.log("[extractColumnData] id:",col);
        const table = getTableByOracleId(oracle, col["Use content from"]);
        table.forEach((rowData, rowIndex) => {
            if (!table) {
                throw badJsonError(extractColumnData);
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
        const table = getTableByOracleId(oracle, col["Use content from"]);
        if (!table) {
            throw badJsonError(extractColumnData);
        }
        // console.log("found table:", table);
        table.forEach((rowData, rowIndex) => {
            const currentTableRow = newTableRows[rowIndex];
            const newRowText = rowData[col.Key];
            if (typeof rowData[col.Key] !== "string") {
                throw badJsonError(extractColumnData, newRowText);
            }
            currentTableRow[col.Label] = newRowText;
        });
    });
    return newTableRows;
}
//# sourceMappingURL=extractColumnData.js.map