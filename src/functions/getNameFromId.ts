import type OracleTableId from "../types/oracles/OracleTableId.js";

// TODO: generate fallback names for when it's unspecified

/**
 * Gets the last item of a path-like oracle ID.
 * @date 4/5/2022 - 1:50:42 AM
 *
 * @export
 * @param {OracleTableId} oracleId
 * @returns {string}
 */
export default function getNameFromId(oracleId: OracleTableId): string {
  const fragments = oracleId.split(" / ");
  return fragments[fragments.length - 1];
}
