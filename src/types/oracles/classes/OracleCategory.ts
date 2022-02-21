import t from 'ts-runtime/lib';

import IOracleData from "../interfaces/IOracleData";
import IOracle from "../interfaces/IOracle";

import OracleCategoryId, { OracleCategoryJaggedId, OracleCategoryName } from "../OracleCategoryId";

import OracleInfo from "./OracleInfo";
import OracleUsage from "./OracleUsage";
import { isOracleUsage, isOracles, isOracleCategories } from "../../typeguards";
import { Source } from "../../general/Source";
import buildOracleId from "../../../utilities/buildOracleId";
import _ from "lodash";
import { IHasId } from "../../general/Id";
import OracleCategoryDisplay from "./OracleCategoryDisplay";
import IOracleCategory from "../interfaces/IOracleCategory";
import IOracleCategoryData from '../interfaces/IOracleCategoryData';


export default class OracleCategory implements IOracleCategory, IOracle {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Aliases?: string[] | undefined;
  Source: Source;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: string | undefined;
  Display: OracleCategoryDisplay;
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
    this.Display = new OracleCategoryDisplay(json.Display ?? {}, this.Name);
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