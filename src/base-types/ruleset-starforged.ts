import { type Encounters, type Metadata, type Progress } from '@base-types'

type LegacyType = 'quests' | 'bonds' | 'discoveries'

export type ProgressType =
	| Progress.ProgressTypeCommon
	| 'expedition_progress'
	| 'connection_progress'
	| `${LegacyType}_legacy`

// export type ConditionMeterAlias =
// 	| RulesetClassic.ConditionMeterAliasCommon
// 	| 'vehicle_integrity'
// 	| 'command_vehicle_integrity'
// 	| 'support_vehicle_integrity'
// 	| 'incidental_vehicle_integrity'

// const commandVehicleIntegrity =
// 	/^[a-z0-9_]{3,}\/assets\/command_vehicle\/[a-z_]+\/controls\/integrity$/
// const supportVehicleIntegrity =
// 	/^[a-z0-9_]{3,}\/assets\/support_vehicle\/[a-z_]+\/controls\/integrity$/

export interface Suggestions extends Metadata.SuggestionsBase {
	encounters?: Encounters.EncounterStarforgedID[]
}
