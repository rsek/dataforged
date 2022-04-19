"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueStatArrays = exports.uniquePairs = void 0;
const stats = ["Edge", "Iron", "Heart", "Shadow", "Wits"];
/**
 * Given an array of items, return an array of all unique pairs of items
 * @param items - An array of items to pair.
 * @returns An array of arrays.
 */
function uniquePairs(...items) {
    const allPairs = [];
    items.forEach(item1 => items.forEach(item2 => {
        if (item1 !== item2) {
            const newPair = [item1, item2].sort();
            const matchingPairs = allPairs.some((oldPair) => oldPair.every((item, index) => item === newPair[index]));
            if (matchingPairs === false) {
                // if (matchingPairs.length === 0) {
                allPairs.push(newPair);
            }
        }
    }));
    return allPairs;
}
exports.uniquePairs = uniquePairs;
/**
 * Given a list of stats, return a list of unique pairs of stats, and a list of unique triads of stats
 * @returns An array of objects, each of which has a statRecord property.
 */
function uniqueStatArrays() {
    const statPairs = uniquePairs(...stats);
    const statTriads = [];
    statPairs.forEach(pair => {
        stats.forEach(stat => {
            if (!pair.includes(stat)) {
                statTriads.push([stat, pair]);
            }
        });
    });
    return statTriads.sort().map(triad => {
        const statRecord = {};
        statRecord[triad[0]] = 3;
        statRecord[triad[1][0]] = 2;
        statRecord[triad[1][1]] = 2;
    });
}
exports.uniqueStatArrays = uniqueStatArrays;
console.log(uniqueStatArrays());
//# sourceMappingURL=uniqueStatArrays.js.map