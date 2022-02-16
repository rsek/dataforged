import { OracleTableId } from "../oracles/OracleId";
import { OracleRequirement } from "../oracles/OracleRequirement";


export interface ILegacyRequires extends Omit<OracleRequirement, "Tables"> {
  "Oracle rolls": OracleTableId[];
}

export default class LegacyRequires implements ILegacyRequires {
  "Oracle rolls": OracleTableId[];
  Results?: string[] | undefined;
  constructor(json: OracleRequirement) {
    this["Oracle rolls"] = json.Tables;
    this.Results = json.Results;
  }
}