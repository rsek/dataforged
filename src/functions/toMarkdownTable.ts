
import t from 'ts-runtime/lib';
// import fs from "fs";
// import _ from "lodash";
// import { OracleCategory } from "../classes/oracles/OracleCategory";
// import { OracleInfo } from "../classes/oracles/OracleInfo";
// import { OracleTableRow } from "../classes/oracles/OracleTableRow";



// function toMdOracleCat(oracleCat: OracleCategory, headerLevel = 2) {
//   const header = _.repeat("#", headerLevel) + " " + oracleCat.Display.Title;
//   let body = "";

//   if (oracleCat.Oracles) {
//     body += "\n\n" + oracleCat.Oracles.map(oracle => toMdOracleInfo(oracle, headerLevel + 1)).join("\n\n");
//   }
//   if (oracleCat.Categories) {
//     body += "\n\n" + oracleCat.Categories.map(oracleSubCat => toMdOracleCat(oracleSubCat, headerLevel + 1)).join("\n\n");
//   }
//   return header + body;
// }

// function toMdOracleInfo(oracleInfo: OracleInfo, headerLevel = 3) {
//   const header = _.repeat("#", headerLevel) + " " + (oracleInfo.Display.Title);
//   let body = "";
//   let rollColumns: OracleTableRow[][] = [];
//   let resultColumns: OracleTableRow[][] = [];
//   let contentRowsHeight: number;
//   let resultUsed = false;

//   // let rollColumns = oracleInfo.Display['Roll columns'].map(id => );
//   if (oracleInfo["Table"]) {
//     rollColumns = oracleInfo.Display["Column labels"].map(() => oracleInfo["Table"]) as OracleTableRow[][];
//     resultColumns = oracleInfo.Display["Column labels"].map(() => oracleInfo["Table"]) as OracleTableRow[][];
//     contentRowsHeight = oracleInfo["Table"].length;
//   } else if (oracleInfo.Display["Table from"]) {
//     // TODO
//   }

//   const columns: string[][] = [];
//   const labels = [...oracleInfo.Display["Column labels"]];
//   rollColumns.forEach((colData) => {
//     if (oracleInfo.Display["Column labels"].length < 1) {
//       throw new Error("Ran out of column labels while building roll columns.")
//     }
//     ;
//     columns.push(toRollColumnArray(labels.shift() as string, colData, contentRowsHeight));
//   });
//   resultColumns.forEach((colData) => {
//     if (labels.length < 1) {
//       throw new Error("Ran out of column labels while building result columns.")
//     }
//     if (!resultUsed && rollColumns.length == 1) {
//       columns.push(toResultColumnArray(labels.shift() as string, colData, contentRowsHeight));
//       resultUsed = true;
//     } else if (rollColumns.length == 1) {
//       columns.push(toSummaryColumnArray(labels.shift() as string, colData, contentRowsHeight));
//     } else {
//       columns.push(toResultColumnArray(labels.shift() as string, colData, contentRowsHeight));
//     }
//   });
//   if (labels.length > 0) {
//     // TODO: handle summary

//   }

//   const table = toMdTable(...columns);
//   body += "\n\n" + table;

//   return header + body;
// }

// function toMdMultiTableData(rollColumnData: OracleTableRow[][], rollColumnLabels: string[], resultColumnData: OracleTableRow[][], resultColumnLabels: string[]) {
//   if (rollColumnLabels.length != rollColumnData.length) {
//     throw new Error("rollColumnLabels.length != rollColumns.length");
//   } if (resultColumnLabels.length != resultColumnData.length) {
//     throw new Error("resultColumnLabels.length != resultColumns.length");
//   }
//   const minimumRows = [...rollColumnData, ...resultColumnData].map(col => col.length).reduce((colA, colB) => colA > colB ? colA : colB);

//   const rollColumns = rollColumnData.map((col, index) => toRollColumnArray(rollColumnLabels[index], col, minimumRows));
//   const resultColumns = resultColumnData.map((col, index) => toResultColumnArray(resultColumnLabels[index], col, minimumRows));
//   return [...rollColumns, ...resultColumns];
// }

// function toSummaryColumnArray(label: string, rows: OracleTableRow[], minimumRows: number) {
//   const rowContent = rows.map(row => row.Summary || "");
//   return toColumnArray(label, rowContent, minimumRows);
// }

// function toResultColumnArray(label: string, rows: OracleTableRow[], minimumRows: number) {
//   const rowContent = rows.map(row => row.Result);
//   return toColumnArray(label, rowContent, minimumRows);
// }
// function toRollColumnArray(label: string, rows: OracleTableRow[], minimumRows: number) {
//   const rowContent = rows.map(row => {
//     const rollString = row.Ceiling == row.Floor ? row.Ceiling.toString() : `${row.Floor}-${row.Ceiling}`;
//     return rollString;
//   });
//   return toColumnArray(label, rowContent, minimumRows);
// }
// function toColumnArray(label: string, rowContent: string[], minimumRows: number) {
//   while (rowContent.length < minimumRows) {
//     rowContent.concat("");
//   }
//   rowContent.unshift(label);
//   return rowContent;
// }

// export function toMdTable(...columnArrays: string[][]) {
//   const transposed = transpose2dArray(columnArrays);
//   return mdTableFrom2dArray(transposed);
// }

// function mdTableFrom2dArray(array2d: string[][]) {
//   const columnMax = array2d.map(column => column.map(row => row.length).reduce((rowA, rowB) => rowA > rowB ? rowA : rowB));
//   const md2dArray = array2d.map(row => {
//     row = row.map((column, index) => column.padEnd(columnMax[index]))
//     return row;
//   });

//   // inner borders
//   const headerBorder = columnMax.map(columnWidth => _.repeat("-", columnWidth));
//   md2dArray.splice(1, 0, headerBorder);

//   let mdRowStrings = md2dArray.map((row) => row.map((col, i) => col.padEnd(columnMax[i])).join(" | "));
//   // trim trailing whitepace
//   mdRowStrings = mdRowStrings.map(row => row.trim());
//   const tableString = mdRowStrings.join("\n");
//   return tableString;
// }

// function transpose2dArray(array2d: string[][]) {
//   return array2d[0].map((_, colIndex) => array2d.map(row => row[colIndex]));
// }

// function buildMdOracles(headerText = "Ironsworn Oracles", ...oracleData: OracleCategory[]) {

//   const header = "# " + headerText;
//   const oracleMarkdown = oracleData.map(oracleCat => toMdOracleCat(oracleCat), 2);

//   return header + "\n\n" + oracleMarkdown.join("\n\n") + "\n";
// }

// const files = fs.readdirSync("./").filter(dir => dir.match(/^ironsworn_oracles/)).map(file => "./" + file);
// const text = buildMdOracles(...files);
// fs.writeFileSync("./oracles.md", text);