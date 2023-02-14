import {
	type DelveSites,
	type Encounters,
	type Regions,
	type Metadata,
	type Progress
} from '@base-types'

export type ProgressType =
	| Progress.ProgressTypeCommon
	| 'journey_progress'
	| 'delve_progress'
	| 'bonds_progress'

export type ConditionMeterAliasCommon =
	| 'companion_health'
	| 'attached_asset_meter'

export type ConditionMeterAlias = ConditionMeterAliasCommon

export interface Suggestions extends Metadata.SuggestionsBase {
	site_domains?: DelveSites.DelveSiteDomainID[]
	site_themes?: DelveSites.DelveSiteThemeID[]
	encounters?: Encounters.EncounterClassicID[]
	regions?: Regions.RegionEntryID[]
}
