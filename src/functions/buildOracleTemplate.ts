import _ from "lodash";
import IOracleInfoData from "../types/oracles/interfaces/IOracleInfoData";
import replaceInAllStrings from "./replaceInAllStrings";

export default function buildOracleTemplate(json: IOracleInfoData): IOracleInfoData {
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