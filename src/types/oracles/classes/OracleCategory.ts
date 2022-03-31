import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import Oracle from "./Oracle";
import OracleUsage from "./OracleUsage";
import buildOracleId from "../../../functions/buildOracleId";
import _ from "lodash";
import OracleCategoryDisplay from "./OracleCategoryDisplay";
import IOracleCategory from "../interfaces/IOracleCategory";
import propagateToChildren from "../../../functions/object-transform/propagateToChildren";
import IOracleYaml from "../interfaces/yaml/IOracleYaml";
import buildLog from "../../../functions/logging/buildLog";
import IOracleCategoryYaml from "../interfaces/yaml/IOracleCategoryYaml";
import Source from "../../general/Source";


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
        return new Oracle(oracleInfo, this.$id, undefined, json, ...ancestorsJson)
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