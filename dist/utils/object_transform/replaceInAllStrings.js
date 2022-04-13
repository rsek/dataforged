import jsonpath from "jsonpath";
import _ from "lodash-es";
/**
 * Replace all instances of `searchValue` in all strings in the given JSON object with `replaceValue`
 * @param json - The JSON object to be searched and replaced.
 * @param searchValue - The string to search for.
 * @param replaceValue - The value to replace.
 * @returns The original JSON object with all strings replaced.
 */
export function replaceInAllStrings(json, searchValue, replaceValue) {
    // console.log("args", arguments);
    const jsonClone = _.cloneDeep(json);
    jsonpath.apply(jsonClone, "$..*", (result) => {
        // console.log(`replacing string '${searchValue}' with '${replaceValue}' in`, json);
        if (typeof result === "string" && result.includes(searchValue)) {
            if (typeof replaceValue !== "string") {
                throw new RangeError(`Expected a string to replace with, but received ${typeof replaceValue}`);
            }
            ;
            const text = result;
            return text.replaceAll(searchValue, replaceValue);
        }
        return result;
    });
    return jsonClone;
}
//# sourceMappingURL=replaceInAllStrings.js.map