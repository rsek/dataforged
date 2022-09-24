import { YamlOracleTable, YamlOracleTableTemplate } from "@schema_yaml";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";

/**
 * Builds Oracle metadata from a template, replacing template string values where appropriate.
 * @param json - The object to be mutated.
 * @returns The original object with the template info removed.
 */
export function templateOracleMetadata(json: YamlOracleTableTemplate): YamlOracleTable {
  // cloning so that the original object isn't mutated
  let jsonClone = _.cloneDeep(json);
  if (jsonClone._templateOracleTable) {
    jsonClone = _.merge(jsonClone._templateOracleTable, jsonClone);
    if (jsonClone._templateVars) {
      const templateVars = _.cloneDeep(jsonClone._templateVars);
      _.forEach(templateVars, (replaceValue, key) => {
        const searchValue = "${{" + key + "}}";
        jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue);
      });
      delete jsonClone._templateOracleTable;
    }
  }
  return jsonClone as YamlOracleTable;
}