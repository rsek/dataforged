import jsonpath from "jsonpath";
import type Row from "../../types/oracles/classes/Row.js";
import type IOracle from "../../types/oracles/interfaces/IOracle.js";
import type IOracleBase from "../../types/oracles/interfaces/IOracleBase.js";
import type IRow from "../../types/oracles/interfaces/IRow.js";
import type OracleTableId from "../../types/oracles/OracleTableId.js";

/**
 * Given an oracleData object, and an id, return the table object of the Oracle that matches the id
 * @param {IOracleBase | IOracleBase[]} oracleData - The data to search.
 * @param {OracleTableId} id - The id of the table you want to get.
 * @returns An array of rows.
 */
export default function getTableByOracleId<T extends IRow[] = Row[]>(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  if (!Array.isArray(oracleData) && oracleData.$id === id) {
    const data = oracleData as IOracle;
    if (data.Table) {
      return data.Table as T;
    }
  };

  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')].Table`) as T;
  return table;
}
