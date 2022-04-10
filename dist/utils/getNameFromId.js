export function getNameFromId(oracleId) {
    const fragments = oracleId.split("/");
    return fragments[fragments.length - 1];
}
//# sourceMappingURL=getNameFromId.js.map