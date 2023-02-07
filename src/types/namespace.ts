import {
  type Collections,
  type Regions,
  type Metadata,
  type DelveSites,
  type Rarities,
  type Encounters
} from '@df-types'

interface Dataset<T extends Metadata.Ruleset> {
  _ruleset: T
  // '_source' prop when in yaml format only
  moves?: Record<string, Collections.MoveCategory>
  assets?: Record<string, Collections.AssetType>
  oracles?: Record<string, Collections.OracleCollection>
}

export interface Dataforged extends Dataset<'starforged'> {
  moves?: Record<string, Collections.MoveCategoryStarforged>
  assets?: Record<string, Collections.AssetTypeStarforged>
  encounters?: Record<string, Encounters.EncounterStarforged>
}
export interface Datasworn extends Dataset<'classic'> {
  moves?: Record<string, Collections.MoveCategoryClassic>
  assets?: Record<string, Collections.AssetTypeClassic>
  regions?: Record<string, Regions.RegionEntry>
  encounters?: Record<string, Collections.EncounterCollectionClassic>
  rarities?: Record<string, Rarities.Rarity>
  delve_sites?: Record<string, DelveSites.DelveSite>
  site_themes?: Record<string, DelveSites.DelveSiteTheme>
  site_domains?: Record<string, DelveSites.DelveSiteDomain>
}
