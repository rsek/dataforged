import { toJtdForm } from 'json-typedef/utils'
import { mapValues } from 'lodash'
import * as RulesetStarforged from 'schema/ruleset-starforged'

export default mapValues(RulesetStarforged, (v, k) => toJtdForm(v as any))
