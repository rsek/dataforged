import OracleTableId from "../../oracles/OracleTableId";
import OracleTableRowId from "../../oracles/OracleTableRowId";



export default interface IRequiredOracleResults {
  "Any of"?: OracleTableRowId[] | undefined;
  "Any from"?: OracleTableId[] | undefined;
}
