import jsonpath from "jsonpath";
import _ from "lodash-es";
/**
 * Recurses over an object and replaces a substring with another string.
 * @param object - The object to be searched and replaced. This function creates a copy and so does **not** mutate `obj`;
 * @param searchValue - The string to search for.
 * @param replaceValue - The value to replace.
 * @returns A copy of the original JSON object with all strings replaced.
 */
export function replaceInAllStrings(object, searchValue, replaceValue) {
    // console.log("args", arguments);
    const jsonClone = _.cloneDeep(object);
    jsonpath.apply(jsonClone, "$..*", (match) => {
        if (typeof match === "string") {
            return match.replaceAll(searchValue, replaceValue);
        }
        return match;
    });
    return jsonClone;
}
