

import IOracleData, { IOracle } from "./IOracle";
import { OracleDisplay } from "./OracleDisplay";
import { OracleCategoryId, OracleCategoryJaggedId, OracleCategoryName, OracleSubcategoryName } from "./OracleId";
import { IOracleInfo, IOracleInfoData, OracleInfo } from "./OracleInfo";
import { OracleUsage } from "./OracleUsage";
import { isOracleUsage, isOracles, isOracleCategories } from "../typeguards";
import { ISource, Source } from "../general/Source";
import buildOracleId from "../../utilities/buildOracleId";
import _ from "lodash";

export interface IOracleCategory extends IOracleData {
  Source: ISource;
  Oracles?: IOracleInfo[] | undefined;
  Categories?: IOracleCategory[] | undefined;
}
export interface IOracleCategoryData extends IOracleCategory {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  _childOf?: OracleCategoryName | undefined;
  _parentOf?: OracleSubcategoryName[] | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  Categories?: IOracleCategoryData[] | undefined;
  Category?: OracleCategoryJaggedId | undefined;
}
export class OracleCategory implements IOracleCategory, IOracle {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display: OracleDisplay;
  Usage?: OracleUsage | undefined;
  Oracles?: OracleInfo[] | undefined;
  Categories?: OracleCategory[] | undefined;
  constructor(
    json: IOracleCategoryData,
    category?: OracleCategoryJaggedId | undefined,
    ...ancestorsJson: IOracleData[]
  ) {
    this.$id = buildOracleId(json, ...ancestorsJson) as OracleCategoryId;
    console.info(`[OracleCategory.constructor] Building ${this.$id}...`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Display = new OracleDisplay(json);
    this.Source = new Source(json.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Category = category ?? undefined;

    if (json.Usage) {
      this.Usage = isOracleUsage(json.Usage) ? new OracleUsage(json.Usage) : undefined;
    }
    if (json.Oracles) {
      this.Oracles = isOracles(json.Oracles) ? json.Oracles.map(info => new OracleInfo(info, this.$id, undefined, json, ...ancestorsJson)) : undefined;
    }
    if (json.Categories) {
      this.Categories = isOracleCategories(json.Categories) ? json.Categories.map(
        oracleCat => new OracleCategory(oracleCat, this.$id as OracleCategoryJaggedId, json, ...ancestorsJson)
      ) : undefined;
    }

  }
}