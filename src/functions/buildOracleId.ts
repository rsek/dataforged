

import type IOracle from "../types/oracles/interfaces/IOracle.js";
import type IOracleCategoryInfo from "../types/oracles/interfaces/IOracleCategory.js";
import type IOracleCategoryYaml from "../types/oracles/interfaces/yaml/IOracleCategoryYaml.js";
import type IOracleYaml from "../types/oracles/interfaces/yaml/IOracleYaml.js";

/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @date 4/5/2022 - 1:50:02 AM
 *
 * @export
 * @param {...((IOracle | IOracleCategoryYaml | IOracleYaml | IOracleCategoryInfo)[])} lineage
 * @returns {string}
 */
export default function buildOracleId(...lineage: (IOracle | IOracleCategoryYaml | IOracleYaml | IOracleCategoryInfo)[]): string {
  const idParts: string[] = lineage.reverse().map(item => item.Name);
  const id = [ "Oracles", ...idParts ].join(" / ");
  return id;
}
