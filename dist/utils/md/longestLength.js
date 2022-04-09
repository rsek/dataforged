export function lengthOfLongest(array) {
    return array.map(item => item.length).reduce((a, b) => a > b ? a : b);
}
//# sourceMappingURL=longestLength.js.map