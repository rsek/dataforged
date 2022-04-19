"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOracleId = void 0;
/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @param ancestors - The ancestor objects of this oracle.
 * @returns
 */
function buildOracleId(gamespace, ...ancestors) {
    const idParts = ancestors.reverse().map((item) => item.Name);
    const id = [gamespace, "Oracles", ...idParts].join("/");
    return id.replaceAll(" ", "_");
}
exports.buildOracleId = buildOracleId;
//# sourceMappingURL=buildOracleId.js.map