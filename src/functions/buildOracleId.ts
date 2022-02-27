

import IOracle from '../types/oracles/interfaces/IOracle';
import IOracleCategoryInfo from '../types/oracles/interfaces/IOracleCategory';
import IOracleCategoryYaml from '../types/oracles/interfaces/yaml/IOracleCategoryYaml';
import IOracleYaml from '../types/oracles/interfaces/yaml/IOracleYaml';


export default function buildOracleId(...lineage: (IOracle | IOracleCategoryYaml | IOracleYaml | IOracleCategoryInfo)[]): string {
  const idParts: string[] = lineage.reverse().map(item => item.Name);
  const id = ["Oracles", ...idParts].join(" / ");
  return id;
}
