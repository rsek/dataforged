import { type Collections, type Regions, type Metadata } from 'src/types'
import { type EncounterStarforged } from 'src/types/encounters'

interface Namespace<T extends Metadata.Ruleset> {
  _ruleset: T
  moves?: Record<string, Collections.MoveCategory<T>>
  assets?: Record<string, Collections.AssetType<T>>
  oracles?: Record<string, Collections.OracleCollection>
}

export interface NamespaceStarforged extends Namespace<'starforged'> {
  encounters?: Record<string, EncounterStarforged>
}
export interface NamespaceClassic extends Namespace<'classic'> {
  regions?: Record<string, Regions.RegionEntry>
  encounters?: Record<string, Collections.EncounterCollection>
  rarities?: Record<string, object>
  delve_sites?: Record<string, object>
  site_themes?: Record<string, object>
  site_domains?: Record<string, object>
}
