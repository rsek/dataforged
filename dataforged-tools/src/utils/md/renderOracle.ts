// import type { Oracle } from "@classes/index.js";
// import type { IOracle } from "@json_out/index.js";
// import { buildLog } from "@utils/logging/buildLog.js";
// import { extractColumnData } from "@utils/md/extractColumnData.js";
// import { renderTable } from "@utils/md/renderTable.js";
// import _ from "lodash-es";

// /**
//  * It takes an oracle and returns a markdown string.
//  * @param oracle - Oracle, headerLevel = 3
//  * @param headerLevel - The header level to use for the title.
//  * @returns A string containing the markdown for the oracle.
//  */
// export function renderOracle(oracle: IOracle, headerLevel = 3) {
//   if (oracle.Display["Column of"]) {
//     return "";
//   }
//   buildLog(renderOracle, `Generating markdown for ${oracle.Display.Title}...`);
//   const header = _.repeat("#", headerLevel) + " " + (oracle.Display.Title);
//   const items = [header];
//   if (oracle.Description) {
//     items.push(oracle.Description);
//   }
//   const tableData = extractColumnData(oracle);
//   const table = renderTable(tableData);
//   items.push(table);
//   return items.join("\n\n");
// }
