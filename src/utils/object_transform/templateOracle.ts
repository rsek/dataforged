import type ITemplateYamlBase from "@dataforged/interfaces/yaml_in/templates/ITemplateYamlBase.js";
import buildLog from "@dataforged/utils/logging/buildLog.js";
import replaceInAllStrings from "@dataforged/utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";

/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
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
