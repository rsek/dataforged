import jsonpath from "jsonpath";
import type Oracle from "../../types/oracles/classes/Oracle.js";
import type IOracleBase from "../../types/oracles/interfaces/IOracleBase.js";
import type OracleTableId from "../../types/oracles/OracleTableId.js";

export default function getOracleById(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`) as Oracle;
  return table;
}
