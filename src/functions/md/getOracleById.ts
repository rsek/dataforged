import jsonpath from "jsonpath";
import type Oracle from "../../types/oracles/classes/Oracle.js";
import type IOracleBase from "../../types/oracles/interfaces/IOracleBase.js";
import type OracleTableId from "../../types/oracles/OracleTableId.js";

/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param {IOracleBase | IOracleBase[]} oracleData - The data to search in.
 * @param {OracleTableId} id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
export default function getOracleById(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`) as Oracle;
  return table;
}
