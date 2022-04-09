import jsonpath from "jsonpath";
import _ from "lodash-es";
export function replaceInAllStrings(json, searchValue, replaceValue) {
    const jsonClone = _.cloneDeep(json);
    jsonpath.apply(jsonClone, "$..*", (result) => {
        if (typeof result === "string" && result.includes(searchValue)) {
            const text = result;
            return text.replaceAll(searchValue, replaceValue);
        }
        return result;
    });
    return jsonClone;
}
//# sourceMappingURL=replaceInAllStrings.js.map