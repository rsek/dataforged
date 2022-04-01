import type OracleTableId from "../types/oracles/OracleTableId.js";

// TODO: generate fallback names for when it's unspecified
export function getNameFromId(oracleId: OracleTableId): string {
  const fragments = oracleId.split(" / ");
  return fragments[fragments.length - 1];
}
