// import { title } from "process";
// import MdString from "../general/MdString";
// import Source from "../general/Source";
// import { ISuggestions, Suggestions } from "../general/Suggestions";
// import { IOracleContent, OracleContent } from "../oracles/OracleContent";
// import { OracleCategoryId } from "../oracles/OracleId";
// import { IOracleInfo, OracleInfo } from "../oracles/OracleInfo";
// import { IOracleTableRow } from "../oracles/OracleTableRow";
// import { IOracleUsage, OracleUsage } from "../oracles/OracleUsage";
// import LegacyOracleTableRow, { ILegacyOracleTableRow } from "./LegacyOracleTableRow";
// import LegacyOracleUsage, { ILegacyOracleUsage } from "./LegacyOracleUsage";
// import LegacySource, { ILegacySource } from "./LegacySource";


// export interface ILegacyOracleInfo extends Omit<IOracleInfo, "Table" | "Oracles" | "$id" | "Source" | "Usage"> {
//   Id: IOracleInfo["$id"];
//   "Display name"?: string | undefined;
//   Usage?: ILegacyOracleUsage | undefined;
//   Table?: ILegacyOracleTableRow[] | undefined;
//   Tables?: ILegacyOracleInfo[] | undefined;
//   Description?: MdString | undefined;
//   Content?: IOracleContent | undefined;
//   Source: ILegacySource;
//   Aliases?: string[] | undefined;
// }

// export default class LegacyOracleInfo implements ILegacyOracleInfo {
//   Id: IOracleInfo["$id"];
//   "Display name"?: string | undefined;
//   Category: OracleCategoryId;
//   Aliases?: string[] | undefined;
//   Source: LegacySource;
//   Name: string;
//   Table?: LegacyOracleTableRow[] | undefined;
//   Tables?: LegacyOracleInfo[] | undefined;
//   Usage?: LegacyOracleUsage | undefined;
//   Description?: MdString | undefined;
//   Content?: OracleContent | undefined;
//   Initial?: boolean;
//   Suggestions?: Suggestions;
//   constructor(json: IOracleInfo) {
//     let table;
//     let tables;
//     if (json.Table) {
//       table = json.Table.map(row => new LegacyOracleTableRow(row as IOracleTableRow));
//     }
//     if (json.Oracles) {
//       tables = json.Oracles.map(oracleInfo => new LegacyOracleInfo(oracleInfo as IOracleInfo));
//     }
//     this.Id = json.$id;
//     this.Name = json.Name;
//     this["Display name"] = json.Display?.Title != this.Name ? json.Display?.Title : undefined;
//     this.Aliases = json.Aliases;
//     this.Category = json.Category;
//     this.Description = json.Description;
//     this.Source = new LegacySource(json.Source);
//     this.Usage = json.Usage ? new LegacyOracleUsage(json.Usage) : undefined;
//     this.Content = json.Content ? new OracleContent(json.Content) : undefined
//     this.Table = table;
//     this.Tables = tables;
//   }
// }