import type { AssetType, DataRootBase, DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassic, EncounterStarforged, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export interface GameDataRoot extends DataRootBase {
  asset_types: { [key: SnakeCaseString]: AssetType }
  encounters: { [key: SnakeCaseString]: EncounterStarforged } | { [key: SnakeCaseString]: EncounterNatureClassic }
  move_categories: { [key: SnakeCaseString]: MoveCategory }
  oracle_sets: { [key: SnakeCaseString]: OracleSet }
  setting_truths: { [key: SnakeCaseString]: TruthStarforged } | { [key: SnakeCaseString]: TruthClassic }
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export interface Starforged extends GameDataRoot {
  'encounters': { [key: SnakeCaseString]: EncounterStarforged }
  'setting_truths': { [key: SnakeCaseString]: TruthStarforged }
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export interface Ironsworn extends GameDataRoot {
  encounters: { [key: SnakeCaseString]: EncounterNatureClassic }
  setting_truths: { [key: SnakeCaseString]: TruthClassic }
  delve_site_domains: { [key: SnakeCaseString]: DelveSiteDomain }
  delve_site_themes: { [key: SnakeCaseString]: DelveSiteTheme }
  ironlands_regions: { [key: SnakeCaseString]: IronlandsRegion }
  delve_rarities: { [key: SnakeCaseString]: DelveRarity }
}
