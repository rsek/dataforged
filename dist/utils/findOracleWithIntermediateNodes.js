/**
 * Walks the oracle data tree to find a specific ID, then returns that item and its ancestors.
 * @param {string} id - the id of the oracle you want to find
 * @param {IOracleCategory[]} oracleDataRoot - The root of the oracle data tree.
 * @returns An array of IOracleCategory and IOracle objects.
 */
export function findOracleWithIntermediateNodes(id, oracleDataRoot) {
    const result = [];
    function walkCategory(cat) {
        var _a, _b;
        result.push(cat);
        if (cat.$id === id)
            return true;
        for (const oracle of (_a = cat.Oracles) !== null && _a !== void 0 ? _a : []) {
            if (walkOracle(oracle))
                return true;
        }
        for (const childCat of (_b = cat.Categories) !== null && _b !== void 0 ? _b : []) {
            if (walkCategory(childCat))
                return true;
        }
        result.pop();
        return false;
    }
    function walkOracle(oracle) {
        var _a;
        result.push(oracle);
        if (oracle.$id === id)
            return true;
        for (const childOracle of (_a = oracle.Oracles) !== null && _a !== void 0 ? _a : []) {
            if (walkOracle(childOracle))
                return true;
        }
        result.pop();
        return false;
    }
    for (const cat of oracleDataRoot) {
        walkCategory(cat);
    }
    return result;
}
