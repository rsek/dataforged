import { lengthOfLongest } from "./longestLength.js";
import { transpose2dArray } from "./transpose2dArray.js";
import _ from "lodash-es";
export function renderTable(rowDataArray) {
    const tableBody = rowDataArray.map(row => Object.values(row));
    const tableHeaderText = Object.keys(rowDataArray[0]);
    let table = [tableHeaderText, ...tableBody];
    const columnWidths = transpose2dArray(table).map(col => lengthOfLongest(col));
    const colIsCentered = (transpose2dArray(tableBody)).map(col => col.every(cell => cell.match(/^[^A-z]+$/) !== null));
    table = table.map((row) => row.map((cell, colIndex) => cell.padEnd(columnWidths[colIndex], " ")));
    let rowStrings = table.map(row => row.join(" | "));
    const headBorder = rowStrings[0].split("|").map((colContent, colIndex) => {
        let border = _.repeat("-", colContent.length);
        if (colIsCentered[colIndex]) {
            border = border.replace(/^-(-+)-$/, ":$1:");
        }
        return border;
    })
        .join("|");
    rowStrings.splice(1, 0, headBorder);
    rowStrings = rowStrings.map(row => row.trimEnd());
    return rowStrings.join("\n");
}
//# sourceMappingURL=renderTable.js.map