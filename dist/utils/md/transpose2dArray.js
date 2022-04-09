export function transpose2dArray(array) {
    const output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    return output;
}
//# sourceMappingURL=transpose2dArray.js.map