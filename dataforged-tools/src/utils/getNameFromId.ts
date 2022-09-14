
// TODO: generate fallback names for when it's unspecified

import type { IOracleTable } from "@json_out/index.js";


/**
 * Gets the last item of a path-like oracle ID.
 */
export function getNameFromId(oracleId: IOracleTable["$id"]): string {
  const fragments = oracleId.split("/");
  return fragments[fragments.length - 1];
}
