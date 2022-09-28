import { buildLog } from '../logging/buildLog.js'
import { replaceInAllStrings } from './replaceInAllStrings.js'
import _ from 'lodash-es'
/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
export function templateOracle (json, template) {
  buildLog(templateOracle, 'Building oracle from template...')
  // buildLog(templateOracle, "Cloning objects...");
  let jsonClone = _.cloneDeep(json)
  const templateClone = _.cloneDeep(template)
  // buildLog(templateOracle, "Merging objects...");
  jsonClone = _.merge(templateClone, jsonClone)
  if (jsonClone._templateVars) {
    _.forEach(jsonClone._templateVars, (replaceValue, key) => {
      const searchValue = '${{' + key + '}}'
      buildLog(templateOracle, `Replacing "${searchValue}" with "${replaceValue}"`)
      jsonClone = replaceInAllStrings(jsonClone, searchValue, replaceValue)
    })
  }
  return jsonClone
}
// # sourceMappingURL=templateOracle.js.map
