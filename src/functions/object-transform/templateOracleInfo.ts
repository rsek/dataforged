import _ from "lodash-es";
import IOracleYaml from "../../types/oracles/interfaces/yaml/IOracleYaml";
import replaceInAllStrings from "./replaceInAllStrings";

export default function templateOracleInfo(json: IOracleYaml): IOracleYaml {
  // cloning so that the original object isn't mutated
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