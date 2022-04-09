import type { Oracle } from "@classes/index.js";
import type { IOracleBase, OracleTableId } from "@json_out/index.js";
import jsonpath from "jsonpath";

/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param oracleData - The data to search in.
 * @param id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
export function getOracleById(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`) as Oracle;
  return table;
}
