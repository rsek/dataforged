import _ from "lodash";
import ITemplateInfoBase from "../types/oracles/interfaces/ITemplateInfoBase";
import buildLog from "./buildLog";
import replaceInAllStrings from "./replaceInAllStrings";

export default function buildFromTemplate<T extends ITemplateInfoBase>(json: T, template: ITemplateInfoBase): T {
  // clones to avoid mutating the original object, which may be referenced by other objects.
  let jsonClone = _.cloneDeep(json);
  let templateclone = _.cloneDeep(template);
  jsonClone = _.merge(templateclone, jsonClone);
  if (jsonClone._templateVars) {
    _.forEach(jsonClone._templateVars, (replaceValue, key) => {
      let searchValue = "${{" + key + "}}";
      jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
    });
  }
  return jsonClone;
}
