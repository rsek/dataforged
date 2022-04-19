"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceInAllStrings = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Recurses over an object and replaces a substring with another string.
 * @param object - The object to be searched and replaced. This function creates a copy and so does **not** mutate `obj`;
 * @param searchValue - The string to search for.
 * @param replaceValue - The value to replace.
 * @returns A copy of the original JSON object with all strings replaced.
 */
function replaceInAllStrings(object, searchValue, replaceValue) {
    // console.log("args", arguments);
    const jsonClone = lodash_es_1.default.cloneDeep(object);
    jsonpath_1.default.apply(jsonClone, "$..*", (match) => {
        if (typeof match === "string") {
            return match.replaceAll(searchValue, replaceValue);
        }
        return match;
    });
    return jsonClone;
}
exports.replaceInAllStrings = replaceInAllStrings;
//# sourceMappingURL=replaceInAllStrings.js.map