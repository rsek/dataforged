import { toJtdEnum } from 'json-typedef/utils'
import * as JSONSchema from '@schema-json'
import { JTDSchemaType } from 'ajv/dist/core'
import * as Types from '@base-types'

export const PlayerStat = toJtdEnum(JSONSchema.Players.PlayerStat)

export const PlayerConditionMeter = toJtdEnum(
	JSONSchema.Players.PlayerConditionMeter
)

export const PlayerAttributeRollable: JTDSchemaType<
	Types.Players.PlayerStat | Types.Players.PlayerConditionMeter
> = {
	metadata: {
		description:
			'A standard player stat, or a condition meter that can be used as a stat in an action roll.'
	},
	enum: [...PlayerStat.enum, ...PlayerConditionMeter.enum]
}
