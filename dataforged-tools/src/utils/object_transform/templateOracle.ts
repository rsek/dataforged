import { YamlOracleSet, YamlOracleSetTemplate, YamlOracleTable, YamlOracleTableTemplate, YamlTemplateBase } from '@schema'
import { buildLog } from '@utils/logging/buildLog.js'
import { replaceInAllStrings } from '@utils/object_transform/replaceInAllStrings.js'

import _ from 'lodash'

/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
export function templateOracle<T extends YamlOracleSet|
YamlOracleTable> (json: Partial<T>&YamlTemplateBase, template: Partial<T>): T {
  buildLog(templateOracle, 'Building oracle from template...')

  // buildLog(templateOracle, "Cloning objects...");
  let jsonClone = _.cloneDeep(json)
  const templateClone = _.cloneDeep(template)
  // buildLog(templateOracle, "Merging objects...");
  jsonClone = _.merge(templateClone, jsonClone)
  if (jsonClone._templateVars != null) {
    _.forEach(jsonClone._templateVars, (replaceValue, key) => {
      const searchValue = '${{' + key + '}}'
      buildLog(templateOracle, `Replacing "${searchValue}" with "${replaceValue}"`)
      jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue)
    })
  }
  return jsonClone as T
}
