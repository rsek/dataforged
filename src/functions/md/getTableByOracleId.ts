import jsonpath from "jsonpath";
import type IOracle from "../../types/oracles/interfaces/IOracle.js";
import type IOracleBase from "../../types/oracles/interfaces/IOracleBase.js";
import type IRow from "../../types/oracles/interfaces/IRow.js";
import type OracleTableId from "../../types/oracles/OracleTableId.js";

export default function getTableByOracleId(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  if (!Array.isArray(oracleData) && oracleData.$id === id) {
    const data = oracleData as IOracle;
    if (data.Table) {
      return data.Table as IRow[];
    }
  };

  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')].Table`) as IRow[];
  return table;
}
