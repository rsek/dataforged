import { type RulesetStarforged as Types } from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'

export const ConditionMeterAlias: Schema<Types.ConditionMeterAlias> = {
	type: 'string',
	description:
		'Tags used to group  non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.',
	enum: [
		'companion_health',
		'attached_asset_meter',
		'vehicle_integrity',
		'command_vehicle_integrity',
		'support_vehicle_integrity',
		'incidental_vehicle_integrity'
	]
}

export const ProgressType: Schema<Types.ProgressType> = {
	type: 'string',
	description: 'Standard progress track types found in Ironsworn: Starforged.',
	enum: [
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'expedition_progress',
		'connection_progress',
		'quests_legacy',
		'bonds_legacy',
		'discoveries_legacy'
	]
}
