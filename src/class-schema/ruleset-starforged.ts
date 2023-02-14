import { Metadata } from '@class-schema'

export enum ProgressType {
	'vow_progress',
	'combat_progress',
	'scene_challenge_progress',
	'connection_progress',
	'expedition_progress',
	'quests_legacy',
	'bonds_legacy',
	'discoveries_legacy'
}

export enum ConditionMeterAlias {
	'companion_health',
	'attached_asset_meter',
	'vehicle_integrity',
	'command_vehicle_integrity',
	'support_vehicle_integrity',
	'incidental_vehicle_integrity'
}

export class Suggestions extends Metadata.SuggestionsBase {
	// encounters?: Encounters.EncounterStarforgedID[]
}
