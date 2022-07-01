//License: MIT
import type { Gamespace , IOracleBase } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IOracleCategoryYaml, IOracleYaml, YamlStub } from "@yaml_in/index.js";

/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @param ancestors - The ancestor objects of this oracle.
 * @returns
 */
export function buildOracleId<T extends string>(gamespace: Gamespace, ...ancestors: (IOracleYaml|IOracleCategoryYaml)[]): T {
  const idParts: string[] = ancestors.reverse().map((item) => formatIdFragment(item._idFragment ?? item.Name));
  const id = [ gamespace, "Oracles", ...idParts ].join("/");
  return id as T;
}
