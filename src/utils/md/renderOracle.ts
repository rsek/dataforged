import type Oracle from "@dataforged/classes/oracles/Oracle.js";
import _ from "lodash-es";
import buildLog from "@dataforged/utils/logging/buildLog.js";
import extractColumnData from "@dataforged/utils/md/extractColumnData.js";
import renderTable from "@dataforged/utils/md/renderTable.js";

/**
 * It takes an oracle and returns a markdown string.
 * @param oracle - Oracle, headerLevel = 3
 * @param headerLevel - The header level to use for the title.
 * @returns A string containing the markdown for the oracle.
 */
export default function renderOracle(oracle: Oracle, headerLevel = 3) {
  if (oracle.Display["Column of"]) {
    return "";
  }
  buildLog(renderOracle, `Generating markdown for ${oracle.Display.Title}...`);
  const header = _.repeat("#", headerLevel) + " " + (oracle.Display.Title);
  const items = [header];
  if (oracle.Description) {
    items.push(oracle.Description);
  }
  const tableData = extractColumnData(oracle);
  const table = renderTable(tableData);
  items.push(table);
  return items.join("\n\n");
}
