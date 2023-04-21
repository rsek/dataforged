import {
	type Encounters,
	type Metadata,
	type Progress,
	type RulesetClassic
} from '@base-types'

type LegacyType = 'quests' | 'bonds' | 'discoveries'

export type ProgressType =
	| Progress.ProgressTypeCommon
	| 'expedition_progress'
	| 'connection_progress'
	| `${LegacyType}_legacy`

export type ConditionMeterAlias =
	| RulesetClassic.ConditionMeterAliasCommon
	| 'vehicle_integrity'
	| 'command_vehicle_integrity'
	| 'support_vehicle_integrity'
	| 'incidental_vehicle_integrity'

// const commandVehicleIntegrity =
// 	/^[a-z0-9][a-z0-9_]+\/assets\/command_vehicle\/[a-z][a-z_]*[a-z]\/controls\/integrity$/
// const supportVehicleIntegrity =
// 	/^[a-z0-9][a-z0-9_]+\/assets\/support_vehicle\/[a-z][a-z_]*[a-z]\/controls\/integrity$/

export interface Suggestions extends Metadata.SuggestionsBase {
	encounters?: Encounters.EncounterStarforgedID[]
}
