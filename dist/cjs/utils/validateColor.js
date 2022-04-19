"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateColor = void 0;
/**
 * It checks if the string is a valid hex color.
 * @param str - The string to be validated.
 * @returns A boolean value.
 */
function validateColor(str) {
    return RegExp(/#?[0-9A-Fa-f]{6}/g).test(str);
}
exports.validateColor = validateColor;
//# sourceMappingURL=validateColor.js.map