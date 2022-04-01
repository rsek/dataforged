import _ from "lodash-es";
import replaceInAllStrings from "./replaceInAllStrings.js";
import type ITemplateYamlBase from "../../types/oracles/interfaces/yaml/ITemplateYamlBase.js";
import buildLog from "../logging/buildLog.js";

export default function templateOracle<T extends ITemplateYamlBase>(json: T, template: ITemplateYamlBase): T {
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
