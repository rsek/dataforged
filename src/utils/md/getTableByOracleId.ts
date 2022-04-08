import type { Row } from "@dataforged/classes/oracles/Row.js";
import type { IOracle, IOracleBase, IRow, OracleTableId } from "@dataforged/json_out/index.js";
import jsonpath from "jsonpath";

/**
 * Given an oracleData object, and an id, return the table object of the Oracle that matches the id
 * @param oracleData - The data to search.
 * @param id - The id of the table you want to get.
 * @returns An array of rows.
 */
export function getTableByOracleId<T extends IRow[] = Row[]>(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  if (!Array.isArray(oracleData) && oracleData.$id === id) {
    const data = oracleData as IOracle;
    if (data.Table) {
      return data.Table as T;
    }
  };

  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')].Table`) as T;
  return table;
}
