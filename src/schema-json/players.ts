import { type JSONSchemaType as Schema } from 'ajv'
import { type Players as Types } from 'schema'

export const PlayerStat: Schema<Types.PlayerStat> = {
	type: 'string',
	description: 'A standard player character stat.',
	enum: ['edge', 'heart', 'iron', 'shadow', 'wits']
}

export const PlayerConditionMeter: Schema<Types.PlayerConditionMeter> = {
	type: 'string',
	description: 'A standard player character condition meter.',
	enum: ['health', 'spirit', 'supply']
}

const PlayerStatID: Schema<Types.PlayerStatID> = {
	type: 'string',
	description: 'ID for a standard player character stat.',
	enum: [
		'player/stats/edge',
		'player/stats/heart',
		'player/stats/iron',
		'player/stats/shadow',
		'player/stats/wits'
	]
}

export const PlayerConditionMeterID: Schema<Types.PlayerConditionMeterID> = {
	type: 'string',
	description: 'ID for a standard player character condition meter.',
	enum: [
		'player/condition_meters/health',
		'player/condition_meters/spirit',
		'player/condition_meters/supply'
	]
}
