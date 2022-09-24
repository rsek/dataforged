import { OracleTable, OracleSet} from "../types";

/**
 * Walks the oracle data tree to find a specific ID, then returns that item and its ancestors.
 * @param {string} id - the id of the oracle you want to find
 * @param {OracleSet[]} oracleDataRoot - The root of the oracle data tree.{OracleSet[]}{OracleSet[]}
 * @returns An array of IOracleSet and IOracleTable objects.
 */


export function findOracleWithIntermediateNodes(id: string, oracleDataRoot: OracleSet[]): (OracleTable | OracleSet)[] { OracleSet[]) OracleSet[])
  const result: (IOracleTable | IOracleSet)[] = []

  function walkSet(cat: OracleSet): boolean {
    result.push(cat)

    if (cat.$id === id) return true
    for (const oracle of cat.Tables ?? []) {
      if (walkOracle(oracle)) return true
    }
    for (const childCat of cat.Sets ?? []) {
      if (walkSet(childCat)) return true
    }

    result.pop()
    return false
  }

  function walkOracle(oracle:OracleTable): boolean {
    result.push(oracle)
    if (oracle.$id === id) return true
    result.pop()
    return false
  }
  for (const oracleSet of oracleDataRoot) {
    walkSet(oracleSet)
  }
  return result
}