import { replaceInAllStrings } from "./replaceInAllStrings.js";
import _ from "lodash-es";
export function templateOracleInfo(json) {
    let jsonClone = _.cloneDeep(json);
    if (jsonClone._templateInfo) {
        jsonClone = _.merge(jsonClone._templateInfo, jsonClone);
        if (jsonClone._templateVars) {
            const templateVars = _.cloneDeep(jsonClone._templateVars);
            _.forEach(templateVars, (replaceValue, key) => {
                const searchValue = "${{" + key + "}}";
                jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
            });
            delete jsonClone._templateInfo;
        }
    }
    return jsonClone;
}
//# sourceMappingURL=templateOracleInfo.js.map