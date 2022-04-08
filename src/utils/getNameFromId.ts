
// TODO: generate fallback names for when it's unspecified

import type { OracleTableId } from "@dataforged/json_out/index.js";


/**
 * Gets the last item of a path-like oracle ID.
 */
export function getNameFromId(oracleId: OracleTableId): string {
  const fragments = oracleId.split(" / ");
  return fragments[fragments.length - 1];
}
