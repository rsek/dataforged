import { IOracleTable, IOracleSet} from "../types";

/**
 * Walks the oracle data tree to find a specific ID, then returns that item and its ancestors.
 * @param {string} id - the id of the oracle you want to find
 * @param {IOracleSet[]} oracleDataRoot - The root of the oracle data tree.
 * @returns An array of IOracleSet and IOracleTable objects.
 */


export function findOracleWithIntermediateNodes(id: string, oracleDataRoot: IOracleSet[]): (IOracleTable | IOracleSet)[] {
  const result: (IOracleTable | IOracleSet)[] = []

  function walkSet(cat: IOracleSet): boolean {
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

  function walkOracle(oracle:IOracleTable): boolean {
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