"use strict";
// TODO: generate fallback names for when it's unspecified
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFromId = void 0;
/**
 * Gets the last item of a path-like oracle ID.
 */
function getNameFromId(oracleId) {
    const fragments = oracleId.split("/");
    return fragments[fragments.length - 1];
}
exports.getNameFromId = getNameFromId;
//# sourceMappingURL=getNameFromId.js.map