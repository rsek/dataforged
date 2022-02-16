import { ISource, Source } from "../general/Source";
import { IOracleCategory } from "../oracles/OracleCategory";
import { OracleCategoryName } from "../oracles/OracleId";
import LegacyOracleInfo, { ILegacyOracleInfo } from "./LegacyOracleInfo";
import LegacyOracleUsage, { ILegacyOracleUsage } from "./LegacyOracleUsage";
import LegacySource, { ILegacySource } from "./LegacySource";

export interface ILegacyOracleCategory extends Omit<IOracleCategory, "$id" | "Oracles" | "Categories" | "Display" | "Source" | "Usage"> {
  Id: IOracleCategory["$id"];
  Source: ILegacySource;
  Aliases?: IOracleCategory["Aliases"];
  "Display name"?: string | undefined;
  Description?: IOracleCategory["Description"];
  Subcategories?: ILegacyOracleCategory[] | undefined;
  Oracles?: ILegacyOracleInfo[] | undefined;
  Usage?: ILegacyOracleUsage | undefined;
}

export default class LegacyOracleCategory implements ILegacyOracleCategory {
  Id: IOracleCategory["$id"];
  Source: LegacySource;
  Name: OracleCategoryName;
  "Display name"?: string | undefined;
  Aliases?: IOracleCategory["Aliases"];
  Description?: IOracleCategory["Description"];
  Oracles?: LegacyOracleInfo[] | undefined;
  Subcategories?: LegacyOracleCategory[] | undefined;
  Usage?: LegacyOracleUsage | undefined;
  constructor(json: IOracleCategory) {
    this.Id = json.$id;
    this.Name = json.Name;
    this.Source = new LegacySource(json.Source);
    this.Description = json.Description;
    this.Aliases = json.Aliases;
    this["Display name"] = json.Display?.Title != this.Name ? json.Display?.Title : undefined;
    this.Usage = json.Usage ? new LegacyOracleUsage(json.Usage) : undefined;
    if (json.Oracles) {
      this.Oracles = json.Oracles.map(oracleJson => new LegacyOracleInfo(oracleJson));
    }
    if (json.Categories) {
      this.Subcategories = json.Categories.map(oracleCatJson => new LegacyOracleCategory(oracleCatJson));
    }
  }
}