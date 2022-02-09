import { OracleTableId } from "./OracleId";

export interface IOracleRequirement {
  Tables: OracleTableId[];
  Results?: string[];
}

export class OracleRequirement implements IOracleRequirement {
  Tables: OracleTableId[];
  Results?: string[];
  constructor(json: IOracleRequirement) {
    this.Tables = json.Tables;
    this.Results = json.Results;
  }
}
