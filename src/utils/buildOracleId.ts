import type { IOracle } from "@dataforged/interfaces/json_out/oracles/IOracle.js";
import type { IOracleCategory } from "@dataforged/interfaces/json_out/oracles/IOracleCategory.js";
import type IOracleCategoryYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleCategoryYaml.js";
import type IOracleYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleYaml.js";

/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 *
 * @param lineage - The ancestor objects of this oracle.
 * @returns
 */
export default function buildOracleId(...lineage: (IOracle | IOracleCategoryYaml | IOracleYaml | IOracleCategory)[]): string {
  const idParts: string[] = lineage.reverse().map(item => item.Name);
  const id = [ "Oracles", ...idParts ].join(" / ");
  return id;
}
