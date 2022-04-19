// TODO: generate fallback names for when it's unspecified
/**
 * Gets the last item of a path-like oracle ID.
 */
export function getNameFromId(oracleId) {
    const fragments = oracleId.split("/");
    return fragments[fragments.length - 1];
}
//# sourceMappingURL=getNameFromId.js.map