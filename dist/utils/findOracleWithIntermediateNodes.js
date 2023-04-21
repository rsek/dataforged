"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOracleWithIntermediateNodes = void 0;
/**
 * Walks the oracle data tree to find a specific ID, then returns that item and its ancestors.
 * @param {string} id - the id of the oracle you want to find
 * @param {OracleSet[]} oracleDataRoot - The root of the oracle data tree.{OracleSet[]}{OracleSet[]}
 * @returns An array of IOracleSet and IOracleTable objects.
 */
function findOracleWithIntermediateNodes(id, oracleDataRoot) {
    OracleSet[];
    OracleSet[];
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
exports.findOracleWithIntermediateNodes = findOracleWithIntermediateNodes;
