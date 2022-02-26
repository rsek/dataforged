import _ from "lodash";
import IOracleYaml from "../../types/oracles/interfaces/yaml/IOracleYaml";
import replaceInAllStrings from "./replaceInAllStrings";

export default function templateOracleInfo(json: IOracleYaml): IOracleYaml {
  // cloning so that the original object isn't mutated
  let jsonClone = _.cloneDeep(json);
  if (jsonClone._templateInfo) {
    jsonClone = _.merge(jsonClone._templateInfo, jsonClone);
    if (jsonClone._templateVars) {
      let templateVars = _.cloneDeep(jsonClone._templateVars);
      _.forEach(templateVars, (replaceValue, key) => {
        let searchValue = "${{" + key + "}}";
        jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
      });
      delete jsonClone._templateInfo;
    }
  }
  return jsonClone;
}