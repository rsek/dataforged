import _ from "lodash";
import ITemplateYamlBase from "../../types/oracles/interfaces/yaml/ITemplateYamlBase";
import buildLog from "../logging/buildLog";
import replaceInAllStrings from "./replaceInAllStrings";

export default function templateOracle<T extends ITemplateYamlBase>(json: T, template: ITemplateYamlBase): T {
  buildLog(templateOracle, "Building oracle from template...");
  let jsonClone = _.cloneDeep(json);
  let templateclone = _.cloneDeep(template);
  jsonClone = _.merge(templateclone, jsonClone);
  if (jsonClone._templateVars) {
    _.forEach(jsonClone._templateVars, (replaceValue, key) => {
      let searchValue = "${{" + key + "}}";
      buildLog(templateOracle, `Replacing "${searchValue}" with "${replaceValue}"`);
      jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
    });
  }
  return jsonClone;
}
