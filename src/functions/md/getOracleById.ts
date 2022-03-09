import OracleTableId from "../../types/oracles/OracleTableId";
import jsonpath from "jsonpath";
import IOracleBase from "../../types/oracles/interfaces/IOracleBase";
import Oracle from "../../types/oracles/classes/Oracle";


export default function getOracleById(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`) as Oracle;
  return table;
}
