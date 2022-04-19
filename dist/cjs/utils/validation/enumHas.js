"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumHas = void 0;
/**
 * Check if an enum has a specific value. Useful mainly in situations where typescript-is shouldn't be invoked, for example while debugging via ts-node or ttypescript.
 * @param enumeration - The enum object
 * @param str - The string to search for.
 * @returns True if the value is included. False if not.
 */
function enumHas(enumeration, str) {
    return Object.values(enumeration).includes(str);
}
exports.enumHas = enumHas;
//# sourceMappingURL=enumHas.js.map