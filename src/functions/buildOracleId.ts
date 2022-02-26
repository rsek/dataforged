
import t from 'ts-runtime/lib';
import IOracleCategoryData from '../types/oracles/interfaces/IOracleCategoryData';
import IOracleData from '../types/oracles/interfaces/IOracleData';
import IOracle from "../types/oracles/interfaces/IOracleData";

export default function buildOracleId(...lineage: (IOracle | IOracleCategoryData | IOracleData)[]): string {
  const idParts: string[] = lineage.reverse().map(item => item.Name);
  const id = ["Oracles", ...idParts].join(" / ");
  return id;
}
