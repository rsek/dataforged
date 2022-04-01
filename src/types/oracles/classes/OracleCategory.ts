
import _ from "lodash-es";
import Oracle from "./Oracle.js";
import OracleCategoryDisplay from "./OracleCategoryDisplay.js";
import OracleUsage from "./OracleUsage.js";
import buildOracleId from "../../../functions/buildOracleId.js";
import buildLog from "../../../functions/logging/buildLog.js";
import propagateToChildren from "../../../functions/object-transform/propagateToChildren.js";
import Source from "../../general/Source.js";
import type IOracleCategory from "../interfaces/IOracleCategory.js";
import type IOracleCategoryYaml from "../interfaces/yaml/IOracleCategoryYaml.js";
import type IOracleYaml from "../interfaces/yaml/IOracleYaml.js";
import type OracleCategoryId from "../OracleCategoryId.js";
import type { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId.js";

export default class OracleCategory implements IOracleCategory {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display: OracleCategoryDisplay;
  Usage?: OracleUsage | undefined;
  Oracles?: Oracle[] | undefined;
  Categories?: OracleCategory[] | undefined;
  "Sample Names"?: string[];
  constructor(
    json: IOracleCategoryYaml,
    category?: OracleCategoryJaggedId | undefined,
    ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]
  ) {
    // if (!is<IOracleCategoryData>(json)) {
    //   buildLog(this.constructor, "Json does not conform to type!");
    //   throw new Error();
    // }

    this.$id = buildOracleId(json, ...ancestorsJson) as OracleCategoryId;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Description = json.Description;
    this.Display = new OracleCategoryDisplay(json.Display ?? {}, this.Name);
    this.Source = new Source(json.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Category = category ?? undefined;
    this["Sample Names"] = json["Sample Names"];
    if (json.Usage) {
      this.Usage = new OracleUsage(json.Usage);
    }
    if (json.Oracles) {
      this.Oracles = json.Oracles.map(oracleInfo => {
        if (json.Usage) {
          propagateToChildren(json.Usage, "Usage", oracleInfo);
        }
        if (json.Requires) {
          propagateToChildren(json.Requires, "Requires", oracleInfo);
        }
        return new Oracle(oracleInfo, this.$id, undefined, json, ...ancestorsJson);
      });
    }
    if (json.Categories) {
      this.Categories = json.Categories.map(
        oracleCat => {
          if (json.Usage) {
            propagateToChildren(json.Usage, "Usage", oracleCat);
          }
          if (json.Requires) {
            propagateToChildren(json.Requires, "Requires", oracleCat);
          }
          return new OracleCategory(oracleCat, this.$id as OracleCategoryJaggedId, json, ...ancestorsJson);
        }
      );
    }
  }
}