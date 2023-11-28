import { TypeClone } from '@sinclair/typebox'
import { type Rules } from '../Rules.js'
import { Player } from '../common/index.js'
import { UnionEnum } from './UnionEnum.js'
import { omit } from 'lodash-es'

export function generateRulesetSchemas(rules: Rules) {
	const ConditionMeterId = UnionEnum(
		Object.keys(rules.condition_meters),
		omit(TypeClone.Type(Player.ConditionMeterId), 'examples', 'type')
	)

	const StatId = UnionEnum(
		Object.keys(rules.stats),
		omit(TypeClone.Type(Player.StatId), 'examples', 'type')
	)

	return { ConditionMeterId, StatId }
}
