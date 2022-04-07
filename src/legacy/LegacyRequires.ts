// import { IRequireGameObjectRegion } from "../gameobjects/GameObjectAttribute";
// import { Region } from "../gameobjects/Region";
// import { OracleTableId } from "../oracles/OracleId";
// import { Requirements } from "@dataforged/../general/Requirements.js";

// export interface ILegacyRequires extends Omit<Requirements, "Tables" | "Attributes.js"> {
//   "Oracle rolls"?: OracleTableId[] | undefined;
//   Results?: string[] | undefined;
//   Region?: Region | undefined;
// }

// export default class LegacyRequires implements ILegacyRequires {
//   "Oracle rolls"?: OracleTableId[] | undefined;
//   Results?: string[] | undefined;
//   Region?: Region | undefined;
//   constructor(json: Requirements) {
//     this["Oracle rolls"] = json.Tables;
//     this.Results = json.Results;
//     let regionData = json.Attributes?.find(item => item.Key === "Region") as IRequireGameObjectRegion;
//     if (regionData) { this.Region = regionData.Values[0]; }
//   }
// }