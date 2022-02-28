import _ from "lodash";
import longestLength from "./longestLength";
import transpose2dArray from "./transpose2dArray";

/**
 * Renders an object array as a markdown table.
 */
export default function renderTable(rowDataArray: Record<string, string>[]) {
  // currently can't handle stuff without a detailed Display key.
  // TODO: typecheck that all have same propertyies
  let tableBody = rowDataArray.map(row => Object.values(row));
  let tableHeaderText = Object.keys(rowDataArray[0]);
  let table = [tableHeaderText, ...tableBody];

  let columnWidths: number[] = transpose2dArray(table).map(col => longestLength(col));

  let colIsCentered = (transpose2dArray(tableBody) as string[][]).map(col => col.every(cell => cell.match(/^[^A-z]+$/) != null));

  table = table.map((row) => row.map((cell, colIndex) => cell.padEnd(columnWidths[colIndex], " ")));

  let rowStrings = table.map(row => row.join(" | "));

  // console.log("before headerbottomborder", rowStrings);

  let headBorder = rowStrings[0].split("|").map((colContent, colIndex) => {
    let border = _.repeat("-", colContent.length);
    if (colIsCentered[colIndex]) {
      border = border.replace(/^-(-+)-$/, ":$1:");
    }
    return border;
  }).join("|");
  rowStrings.splice(1, 0, headBorder);
  rowStrings = rowStrings.map(row => row.trimEnd());
  return rowStrings.join("\n");
}

// let oracleData = buildOracles();
// let testOracle = getOracleById(oracleData, "Oracles / Creatures / Basic Form");
// // console.log("found oracle:", testOracle);
// let extract = extractColumnData(testOracle);
// console.log(renderTable(extract));


