
import t from 'ts-runtime/lib';
import IOracleCategoryData from '../types/oracles/interfaces/IOracleCategoryYaml';
import IOracleDataStub from '../types/oracles/interfaces/IOracleDataStub';
import IOracle from "../types/oracles/interfaces/IOracleDataStub";

export default function buildOracleId(...lineage: (IOracle | IOracleCategoryData | IOracleDataStub)[]): string {
  const idParts: string[] = lineage.reverse().map(item => item.Name);
  const id = ["Oracles", ...idParts].join(" / ");
  return id;
}
