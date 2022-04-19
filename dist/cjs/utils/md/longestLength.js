"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lengthOfLongest = void 0;
/**
 * Given an array of objects, return the length of the longest object.
 * @param array - Array<T>
 * @returns The length of the longest string in the array.
 */
function lengthOfLongest(array) {
    return array.map(item => item.length).reduce((a, b) => a > b ? a : b);
}
exports.lengthOfLongest = lengthOfLongest;
//# sourceMappingURL=longestLength.js.map