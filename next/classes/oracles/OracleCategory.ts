import buildOracleId from "../../../../utilities/buildOracleId";
import IOracleData, { IOracle } from "./IOracle";
import { OracleDisplay } from "./OracleDisplay";
import { OracleCategoryId, OracleCategoryJaggedId, OracleCategoryName, OracleSubcategoryName } from "./OracleId";
import { IOracleInfo, IOracleInfoData, OracleInfo } from "./OracleInfo";
import { OracleUsage } from "./OracleUsage";
import { isOracleUsage, isOracles, isOracleCategories } from "../typeguards";
import { ISource, Source } from "../generic/Source";

export interface IOracleCategory extends IOracleData {
  Source: ISource;
  Oracles?: IOracleInfo[];
  Categories?: IOracleCategory[];
}
export interface IOracleCategoryData extends IOracleCategory {
  _childOf?: OracleCategoryName;
  _parentOf?: OracleSubcategoryName[];
  Oracles?: IOracleInfoData[];
  Categories?: IOracleCategoryData[];
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Category?: OracleCategoryJaggedId;
}
export class OracleCategory implements IOracleCategory, IOracle {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[];
  Source: Source;
  Category?: OracleCategoryJaggedId;
  Description?: string;
  Display: OracleDisplay;
  Usage?: OracleUsage;
  Oracles?: OracleInfo[];
  Categories?: OracleCategory[];
  constructor(
    json: IOracleCategoryData,
    category?: OracleCategoryJaggedId,
    ...ancestorsJson: IOracleData[]
  ) {
    this.$id = buildOracleId(json, ...ancestorsJson) as OracleCategoryId;
    console.info(`[OracleCategory] Building category: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Display = new OracleDisplay(json);
    this.Source = new Source(json.Source);
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

// const propagateToChildren = require("../propagateToChildren.js");
