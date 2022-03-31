import jsonpath from "jsonpath";
import _ from "lodash-es";

export default function replaceInAllStrings<T>(json: T, searchValue: string, replaceValue: string): T {
  const jsonClone = _.cloneDeep(json);
  jsonpath.apply(jsonClone, "$..*", (result) => {
    if (typeof result == "string" && result.includes(searchValue)) {
      const text = result ;
      return text.replaceAll(searchValue, replaceValue);
    }
    return result as T;
  });
  return jsonClone;
}
