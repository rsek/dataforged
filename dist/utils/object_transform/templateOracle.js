import { buildLog } from "../logging/buildLog.js";
import { replaceInAllStrings } from "./replaceInAllStrings.js";
import _ from "lodash-es";
export function templateOracle(json, template) {
    buildLog(templateOracle, "Building oracle from template...");
    let jsonClone = _.cloneDeep(json);
    const templateClone = _.cloneDeep(template);
    jsonClone = _.merge(templateClone, jsonClone);
    if (jsonClone._templateVars) {
        _.forEach(jsonClone._templateVars, (replaceValue, key) => {
            const searchValue = "${{" + key + "}}";
            buildLog(templateOracle, `Replacing "${searchValue}" with "${replaceValue}"`);
            jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
        });
    }
    return jsonClone;
}
//# sourceMappingURL=templateOracle.js.map