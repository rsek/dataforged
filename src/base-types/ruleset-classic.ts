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

// const commandVehicleIntegrity =
// 	/^[a-z0-9][a-z0-9_]+\/assets\/command_vehicle\/[a-z][a-z_]*[a-z]\/controls\/integrity$/
// const supportVehicleIntegrity =
// 	/^[a-z0-9][a-z0-9_]+\/assets\/support_vehicle\/[a-z][a-z_]*[a-z]\/controls\/integrity$/

export type ConditionMeterAlias = ConditionMeterAliasCommon

export interface Suggestions extends Metadata.SuggestionsBase {
	site_domains?: DelveSites.DelveSiteDomainID[]
	site_themes?: DelveSites.DelveSiteThemeID[]
	encounters?: Encounters.EncounterClassicID[]
	regions?: Regions.RegionEntryID[]
}
