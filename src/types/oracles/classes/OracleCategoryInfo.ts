

import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import OracleInfo from "./OracleInfo";
import OracleUsage from "./OracleUsage";
import Source from "../../general/Source";
import buildOracleId from "../../../utilities/buildOracleId";
import _ from "lodash";
import OracleCategoryDisplay from "./OracleCategoryDisplay";
import IOracleCategoryInfo from "../interfaces/IOracleCategoryInfo";
import IOracleCategoryData from '../interfaces/IOracleCategoryData';
import propagateObject from '../../../utilities/propagateObject';
import IOracleInfoData from '../interfaces/IOracleInfoData';
import buildLog from '../../../utilities/buildLog';


export default class OracleCategoryInfo implements IOracleCategoryInfo {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display: OracleCategoryDisplay;
  Usage?: OracleUsage | undefined;
  Oracles?: OracleInfo[] | undefined;
  Categories?: OracleCategoryInfo[] | undefined;
  // Requires?: Requirements | undefined;
  constructor(
    json: IOracleCategoryData,
    category?: OracleCategoryJaggedId | undefined,
    ...ancestorsJson: (IOracleInfoData | IOracleCategoryData)[]
  ) {
    // if (!is<IOracleCategoryData>(json)) {
    //   buildLog(this.constructor, "Json does not conform to type!");
    //   throw new Error();
    // }


    this.$id = buildOracleId(json, ...ancestorsJson) as OracleCategoryId;
    buildLog(this.constructor, `Building ${this.$id}`);
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
          propagateObject(json.Usage, "Usage", oracleInfo);
        }
        if (json.Requires) {
          propagateObject(json.Requires, "Requires", oracleInfo);
        }
        return new OracleInfo(oracleInfo, this.$id, undefined, json, ...ancestorsJson)
      });
    }
    if (json.Categories) {
      this.Categories = json.Categories.map(
        oracleCat => {
          if (json.Usage) {
            propagateObject(json.Usage, "Usage", oracleCat);
          }
          if (json.Requires) {
            propagateObject(json.Requires, "Requires", oracleCat);
          }
          return new OracleCategoryInfo(oracleCat, this.$id as OracleCategoryJaggedId, json, ...ancestorsJson);
        }
      );
    }
  }
}