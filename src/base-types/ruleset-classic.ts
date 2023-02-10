import {
	type DelveSites,
	type Encounters,
	type Regions,
	type Metadata
} from '@base-types'
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

export interface Suggestions extends Metadata.SuggestionsBase {
	site_domains?: DelveSites.DelveSiteDomainID[]
	site_themes?: DelveSites.DelveSiteThemeID[]
	encounters?: Encounters.EncounterClassicID[]
	regions?: Regions.RegionEntryID[]
}
