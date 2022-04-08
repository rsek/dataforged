
// TODO: generate fallback names for when it's unspecified

import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";

/**
 * Gets the last item of a path-like oracle ID.
 */
export default function getNameFromId(oracleId: OracleTableId): string {
  const fragments = oracleId.split(" / ");
  return fragments[fragments.length - 1];
}
