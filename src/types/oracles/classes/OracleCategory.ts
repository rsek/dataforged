

import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import Oracle from "./Oracle";
import OracleUsage from "./OracleUsage";
import Source from "../../general/Source";
import buildOracleId from "../../../functions/buildOracleId";
import _ from "lodash";
import OracleCategoryDisplay from "./OracleCategoryDisplay";
import IOracleCategoryInfo from "../interfaces/IOracleCategory";
import IOracleCategoryData from '../interfaces/IOracleCategoryYaml';
import propagateToChildren from '../../../functions/object-transform/propagateToChildren';
import IOracleYaml from '../interfaces/yaml/IOracleYaml';
import buildLog from '../../../functions/logging/buildLog';


export default class OracleCategoryInfo implements IOracleCategoryInfo {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display: OracleCategoryDisplay;
  Usage?: OracleUsage | undefined;
  Oracles?: Oracle[] | undefined;
  Categories?: OracleCategoryInfo[] | undefined;
  // Requires?: Requirements | undefined;
  constructor(
    json: IOracleCategoryData,
    category?: OracleCategoryJaggedId | undefined,
    ...ancestorsJson: (IOracleYaml | IOracleCategoryData)[]
  ) {
    // if (!is<IOracleCategoryData>(json)) {
    //   buildLog(this.constructor, "Json does not conform to type!");
    //   throw new Error();
    // }


    this.$id = buildOracleId(json, ...ancestorsJson) as OracleCategoryId;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Display = new OracleCategoryDisplay(json.Display ?? {}, this.Name);
    this.Source = new Source(json.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Category = category ?? undefined;
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
          return new OracleCategoryInfo(oracleCat, this.$id as OracleCategoryJaggedId, json, ...ancestorsJson);
        }
      );
    }

  }
}