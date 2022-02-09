import _ from "lodash";
import { ISuggestions, Suggestions } from "../generic/Suggestions";
import { IOracleRequirement, OracleRequirement } from "./OracleRequirement";

export interface IOracleUsage {
  Initial?: boolean;
  Suggestions?: ISuggestions;
  "Select table by"?: string;
  Requires?: IOracleRequirement[];
  "Min rolls"?: number;
  "Max rolls"?: number;
  Repeatable?: boolean;
}
export class OracleUsage implements IOracleUsage {
  Initial?: boolean;
  "Select table by"?: string;
  "Min rolls"?: number;
  "Max rolls"?: number;
  Repeatable?: boolean;
  Suggestions?: Suggestions;
  Requires?: OracleRequirement[];
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
