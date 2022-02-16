
import { ISuggestions, Suggestions } from "../general/Suggestions";
import { IOracleRequirement, OracleRequirement } from "./OracleRequirement";

export interface IOracleUsage {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestions | undefined;
  "Select table by"?: string | undefined;
  Requires?: IOracleRequirement[] | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
}
export class OracleUsage implements IOracleUsage {
  Initial?: boolean | undefined;
  "Select table by"?: string | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  Suggestions?: Suggestions | undefined;
  Requires?: OracleRequirement[] | undefined;
  constructor(json: IOracleUsage) {
    if (json) {
      this.Initial = json.Initial;
      this["Select table by"] = json["Select table by"];
      this["Select table by"] = json["Select table by"];
      this["Max rolls"] = json["Max rolls"];
      this["Min rolls"] = json["Min rolls"];
      this.Repeatable = json.Repeatable;
      this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
      this.Requires = json.Requires ? json.Requires.map(item => new OracleRequirement(item)) : undefined;
    }
  }
}
