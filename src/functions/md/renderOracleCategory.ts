import _ from "lodash";
import OracleCategory from "../../types/oracles/classes/OracleCategory";
import buildLog from "../logging/buildLog";
import renderOracle from "./renderOracle";

export default function renderOracleCategory(oracleCat: OracleCategory, headerLevel = 2) {
  buildLog(renderOracleCategory, `Generating markdown for ${oracleCat.Display.Title
    }...`);
  const header = _.repeat("#", headerLevel) + " " + oracleCat.Display.Title;
  const items = [header];
  if (oracleCat.Description) {
    items.push(oracleCat.Description);
  }
  if (oracleCat.Oracles) {
    items.push(...oracleCat.Oracles.map(oracle => renderOracle(oracle, headerLevel + 1)));
  }
  if (oracleCat.Categories) {
    items.push(...oracleCat.Categories.map(oracleSubCat => renderOracleCategory(oracleSubCat, headerLevel + 1)));
  }
  return items.join("\n\n");
}
