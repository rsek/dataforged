// import { ISuggestions, Suggestions } from "../general/Suggestions";
// import { IOracleUsage, OracleUsage } from "../oracles/OracleUsage";
// import LegacyRequires, { ILegacyRequires } from "./LegacyRequires";

// export interface ILegacyOracleUsage extends Omit<IOracleUsage, "Requires"> {
//   Requires?: ILegacyRequires[] | undefined;
//   Initial?: boolean | undefined;
//   Suggestions?: ISuggestions | undefined;
//   "Select table by"?: string | undefined;
//   "Min rolls"?: number | undefined;
//   "Max rolls"?: number | undefined;
//   Repeatable?: boolean | undefined;
// }

// export default class LegacyOracleUsage implements ILegacyOracleUsage {
//   Initial?: boolean | undefined;
//   "Select table by"?: string | undefined;
//   "Min rolls"?: number | undefined;
//   "Max rolls"?: number | undefined;
//   Repeatable?: boolean | undefined;
//   Suggestions?: Suggestions | undefined;
//   Requires?: LegacyRequires[] | undefined;
//   constructor(json: OracleUsage) {
//     this.Initial = json.Initial;
//     // this["Select table by"] = json["Select table by"];
//     this["Max rolls"] = json["Max rolls"];
//     this["Min rolls"] = json["Min rolls"];
//     this.Repeatable = json.Repeatable;
//     this.Suggestions = json.Suggestions;
//     this.Requires = json.Requires?.map(reqData => new LegacyRequires(reqData));
//   }
// }