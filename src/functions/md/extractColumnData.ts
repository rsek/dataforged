import badJsonError from "../logging/badJsonError";
import Oracle from "../../types/oracles/classes/Oracle";
import getTableByOracleId from "./getTableByOracleId";

export default function extractColumnData(oracle: Oracle) {

  const newTableRows: Record<string, string>[] = [];

  const rollCols = oracle.Display.Table["Roll columns"];
  rollCols.forEach((col, colIndex) => {
    const table = getTableByOracleId(oracle, col.Content);
    table.forEach((rowData, rowIndex) => {
      if (!table) {
        throw badJsonError(extractColumnData);
      }
      if (!newTableRows[rowIndex]) {
        newTableRows.push({} as Record<string, string>);
      }
      const currentTableRow: Record<string, string> = newTableRows[rowIndex];
      const newRowText = (rowData.Floor == null || rowData.Ceiling == null) ? "--" : rowData.Floor == rowData.Ceiling ? `${rowData.Ceiling}` : `${rowData.Floor}–${rowData.Ceiling}`;
      currentTableRow[col.Label] = newRowText;
    });
  });


  const resultCols = oracle.Display.Table["Result columns"];
  resultCols.forEach((col, colIndex) => {
    const table = getTableByOracleId(oracle, col.Content);
    if (!table) {
      throw badJsonError(extractColumnData);
    }
    // console.log("found table:", table);
    table.forEach((rowData, rowIndex) => {
      const currentTableRow: Record<string, string> = newTableRows[rowIndex];
      const newRowText = rowData[col.Key] as string;
      if (typeof rowData[col.Key] != "string") {
        throw badJsonError(extractColumnData, newRowText);
      }
      currentTableRow[col.Label] = newRowText;
    });
  });
  return newTableRows;
}
