"use strict";
//FIXME: could probably be done with lodash's zip instead
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose2dArray = void 0;
function transpose2dArray(array) {
    const output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    return output;
}
exports.transpose2dArray = transpose2dArray;
//# sourceMappingURL=transpose2dArray.js.map