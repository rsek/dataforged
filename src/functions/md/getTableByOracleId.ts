import { is } from "typescript-is";
import badJsonError from "../logging/badJsonError";
import OracleTableId from "../../types/oracles/OracleTableId";
import jsonpath from "jsonpath";
import IRow from "../../types/oracles/interfaces/IRow";
import IOracleBase from "../../types/oracles/interfaces/IOracleBase";
import IOracle from "../../types/oracles/interfaces/IOracle";


export default function getTableByOracleId(oracleData: IOracleBase | IOracleBase[], id: OracleTableId) {
  if (!Array.isArray(oracleData) && oracleData.$id == id) {
    let data = oracleData as IOracle;
    if (data.Table) {
      return data.Table as IRow[];
    }
  };

  let table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')].Table`) as IRow[];
  return table;
}
