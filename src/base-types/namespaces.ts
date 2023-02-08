import {
  type Collections,
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
  oracles?: Record<string, Collections.OracleCollection>
}

export interface NamespaceDataforged extends Namespace<'starforged'> {
  moves?: Record<string, Collections.MoveCategoryStarforged>
  assets?: Record<string, Collections.AssetTypeStarforged>
  encounters?: Record<string, Encounters.EncounterStarforged>
  setting_truths?: Record<string, Truths.TruthStarforged>
}
export interface NamespaceDatasworn extends Namespace<'classic'> {
  moves?: Record<string, Collections.MoveCategoryClassic>
  assets?: Record<string, Collections.AssetTypeClassic>
  regions?: Record<string, Regions.RegionEntry>
  encounters?: Record<string, Collections.EncounterCollectionClassic>
  rarities?: Record<string, Rarities.Rarity>
  delve_sites?: Record<string, DelveSites.DelveSite>
  site_themes?: Record<string, DelveSites.DelveSiteTheme>
  site_domains?: Record<string, DelveSites.DelveSiteDomain>
  world_truths?: Record<string, Truths.TruthClassic>
}
