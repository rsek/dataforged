import type Oracle from "@dataforged/classes/oracles/Oracle.js";
import type { IOracleBase } from "@dataforged/interfaces/json_out/oracles/IOracleBase.js";
import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";
import jsonpath from "jsonpath";

/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param oracleData - The data to search in.
 * @param id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
export default function getOracleById(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`) as Oracle;
  return table;
}
