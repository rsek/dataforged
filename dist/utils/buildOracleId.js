/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 *
 * @param lineage - The ancestor objects of this oracle.
 * @returns
 */
export function buildOracleId(...lineage) {
    const idParts = lineage.reverse().map((item) => item.Name);
    const id = ["Oracles", ...idParts].join("/");
    return id.replaceAll(" ", "_");
}
//# sourceMappingURL=buildOracleId.js.map