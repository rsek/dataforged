import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IHasName, OracleCategoryId, OracleTableId } from "@json_out/index.js";

/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @param ancestors - The ancestor objects of this oracle.
 * @returns
 */
export function buildOracleId<T extends OracleCategoryId|OracleTableId>(gamespace: Gamespace, ...ancestors: IHasName[]): T {
  const idParts: string[] = ancestors.reverse().map((item) => item.Name);
  const id = [ gamespace, "Oracles", ...idParts ].join("/");
  return id.replaceAll(" ", "_") as T;
}
