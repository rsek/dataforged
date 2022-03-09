import _ from "lodash";
import Oracle from "../../types/oracles/classes/Oracle";
import buildLog from "../logging/buildLog";
import extractColumnData from "./extractColumnData";
import renderTable from "./renderTable";

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
