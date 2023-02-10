import { type Encounters, type Metadata } from '@base-types'
import { type ProgressTypeCommon } from '@base-types/progress'
import { type ConditionMeterAliasCommon } from '@base-types/ruleset-classic'

type LegacyType = 'quests' | 'bonds' | 'discoveries'

export type ProgressType =
	| ProgressTypeCommon
	| 'expedition_progress'
	| 'connection_progress'
	| `${LegacyType}_legacy`

export type ConditionMeterAlias =
	| ConditionMeterAliasCommon
	| 'vehicle_integrity'
	| 'command_vehicle_integrity'
	| 'support_vehicle_integrity'
	| 'incidental_vehicle_integrity'

export interface Suggestions extends Metadata.SuggestionsBase {
	encounters?: Encounters.EncounterStarforgedID[]
}
