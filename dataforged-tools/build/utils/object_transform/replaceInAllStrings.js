import { buildLog } from "../logging/buildLog.js";
import { JSONPath } from 'jsonpath-plus';
import _ from 'lodash-es';
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
    JSONPath({
        path: `$..*@string().[?(@.match("${(searchValue)}"))]`,
        json: jsonClone,
        resultType: 'all',
        callback: ({ value, parent, parentProperty, path, pointer }) => {
            // console.log("found string:",value);
            // if (value.includes(searchValue)) {
            buildLog(replaceInAllStrings, `Replacing in value at ${path}`);
            parent[parentProperty] = value?.replaceAll(searchValue, replaceValue);
            // console.log("new string:", parent[parentProperty]);
            // }
        }
    });
    return jsonClone;
}
//# sourceMappingURL=replaceInAllStrings.js.map