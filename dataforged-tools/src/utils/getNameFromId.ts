
// TODO: generate fallback names for when it's unspecified

import type { OracleTable } from "@schema_json";


/**
 * Gets the last item of a path-like oracle ID.
 */
export function getNameFromId(oracleId: OracleTable["$id"]): string {
  const fragments = oracleId.split("/");
  return fragments[fragments.length - 1];
}
