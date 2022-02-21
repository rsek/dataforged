import OracleTableId from "../oracles/OracleTableId";
import OracleTableRowId from "../oracles/OracleTableRowId";



export interface IRequiredOracleResults {
  "Any of"?: OracleTableRowId[] | undefined;
  "Any from"?: OracleTableId[] | undefined;
}
