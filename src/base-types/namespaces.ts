import {
	type Abstract,
	type Regions,
	type Metadata,
	type DelveSites,
	type Rarities,
	type Encounters,
	type Truths
} from '@base-types'

interface Namespace<T extends Metadata.Ruleset> {
	// TODO: '_source' prop when in yaml format only
	_ruleset: T
	_source: Metadata.Source
	oracles?: Record<string, Abstract.OracleCollection>
	moves?: Record<string, Abstract.MoveCategory>
	assets?: Record<string, Abstract.AssetType>
}

export interface NamespaceDataforged extends Namespace<'starforged'> {
	encounters?: Record<string, Encounters.EncounterStarforged>
	setting_truths?: Record<string, Truths.SettingTruth>
}
export interface NamespaceDatasworn extends Namespace<'classic'> {
	regions?: Record<string, Regions.RegionEntry>
	encounters?: Record<string, Abstract.EncounterCollectionClassic>
	rarities?: Record<string, Rarities.Rarity>
	delve_sites?: Record<string, DelveSites.DelveSite>
	site_themes?: Record<string, DelveSites.DelveSiteTheme>
	site_domains?: Record<string, DelveSites.DelveSiteDomain>
	world_truths?: Record<string, Truths.WorldTruth>
}
