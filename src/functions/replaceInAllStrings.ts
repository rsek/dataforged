import jsonpath from "jsonpath";
import _ from "lodash";

export default function replaceInAllStrings<T>(json: T, searchValue: string, replaceValue: string): T {
  let jsonClone = _.cloneDeep(json);
  jsonpath.apply(jsonClone, `$..*`, (result) => {
    if (typeof result == "string" && result.includes(searchValue)) {
      let text = result as string;
      return text.replaceAll(searchValue, replaceValue);
    }
    return result;
  });
  return jsonClone;
}
