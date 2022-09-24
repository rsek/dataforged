import { buildLog } from "@utils/logging/buildLog.js";
import { JSONPath, JSONPathOptions } from "jsonpath-plus";
import _ from "lodash-es";

interface JpResult<T> {
  "value": T,
  "parent": Record<number|string, T>,
  "parentProperty": keyof this["parent"],
  "path": string,
  "pointer": string,
}

/**
 * Recurses over an object and replaces a substring with another string.
 * @param object - The object to be searched and replaced. This function creates a copy and so does **not** mutate `obj`;
 * @param searchValue - The string to search for.
 * @param replaceValue - The value to replace.
 * @returns A copy of the original JSON object with all strings replaced.
 */
export function replaceInAllStrings<T extends JSONPathOptions['json']> (object: T, searchValue: string, replaceValue: string): T {
  // console.log("args", arguments);
  const jsonClone = _.cloneDeep(object);
  JSONPath({
    path:`$..*@string().[?(@.match("${(searchValue)}"))]`,
    json: jsonClone,
    resultType: "all",
    callback: ({ value, parent, parentProperty, path, pointer }: JpResult<string>) => {
      // console.log("found string:",value);
      // if (value.includes(searchValue)) {
      buildLog(replaceInAllStrings, `Replacing in value at ${path}`)
      parent[parentProperty] = value?.replaceAll(searchValue, replaceValue);
      // console.log("new string:", parent[parentProperty]);
      // }
    }
  });
  return jsonClone;
}
