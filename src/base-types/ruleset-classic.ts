import { type ProgressTypeCommon } from '@base-types/progress'

export type ProgressType =
	| ProgressTypeCommon
	| 'journey_progress'
	| 'delve_progress'
	| 'bonds_progress'

export type ConditionMeterAliasCommon =
	| 'companion_health'
	| 'attached_asset_meter'

export type ConditionMeterAlias = ConditionMeterAliasCommon
