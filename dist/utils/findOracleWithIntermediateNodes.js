/**
 * Walks the oracle data tree to find a specific ID, then returns that item and its ancestors.
 * @param {string} id - the id of the oracle you want to find
 * @param {IOracleSet[]} oracleDataRoot - The root of the oracle data tree.
 * @returns An array of IOracleSet and IOracleTable objects.
 */
export function findOracleWithIntermediateNodes(id, oracleDataRoot) {
    const result = [];
    function walkSet(cat) {
        var _a, _b;
        result.push(cat);
        if (cat.$id === id)
            return true;
        for (const oracle of (_a = cat.Tables) !== null && _a !== void 0 ? _a : []) {
            if (walkOracle(oracle))
                return true;
        }
        for (const childCat of (_b = cat.Sets) !== null && _b !== void 0 ? _b : []) {
            if (walkSet(childCat))
                return true;
        }
        result.pop();
        return false;
    }
    function walkOracle(oracle) {
        result.push(oracle);
        if (oracle.$id === id)
            return true;
        result.pop();
        return false;
    }
    for (const oracleSet of oracleDataRoot) {
        walkSet(oracleSet);
    }
    return result;
}
