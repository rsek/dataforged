import * as Utils from 'base-types/utils'
import { type Static } from '@sinclair/typebox'

export const PlayerStat = Utils.StringEnum(
	['edge', 'heart', 'iron', 'shadow', 'wits'],
	{ $id: '#/$defs/PlayerStat' }
)
export type PlayerStat = Static<typeof PlayerStat>

export const PlayerConditionMeter = Utils.StringEnum(
	['health', 'spirit', 'supply'],
	{
		$id: '#/$defs/PlayerConditionMeter'
	}
)
export type PlayerConditionMeter = Static<typeof PlayerConditionMeter>
