
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
  constructor(data: IOracleUsage) {
    if (data) {
      this.Initial = data.Initial;
      this["Select table by"] = data["Select table by"];
      this["Select table by"] = data["Select table by"];
      this["Max rolls"] = data["Max rolls"];
      this["Min rolls"] = data["Min rolls"];
      this.Repeatable = data.Repeatable;
      if (data.Suggestions) { this.Suggestions = new Suggestions(data.Suggestions); }
      if (data.Requires && data.Requires.length) { this.Requires = data.Requires.map(reqData => new OracleRequirement(reqData)); }
    }
  }
}
