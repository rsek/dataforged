export function buildOracleId(...lineage) {
    const idParts = lineage.reverse().map((item) => item.Name);
    const id = ["Oracles", ...idParts].join(" / ");
    return id;
}
//# sourceMappingURL=buildOracleId.js.map