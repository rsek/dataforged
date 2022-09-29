import { AssetType, DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassic, EncounterStarforged, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged, YamlAssetType, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNatureClassic, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlTruthClassic, YamlTruthStarforged } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { YamlOracleSets } from './common/YamlDataRoot'
/**
 * @internal
 */
export interface DataRootBase extends Record<string, { [key: SnakeCaseString]: unknown } | undefined> {
  asset_types: { [key: SnakeCaseString]: YamlAssetType } | { [key: SnakeCaseString]: AssetType }
  /**
   */
  encounters: { [key: SnakeCaseString]: EncounterStarforged }
  | { [key: SnakeCaseString]: EncounterNatureClassic }
  | { [key: SnakeCaseString]: YamlEncounterStarforged }
  | { [key: SnakeCaseString]: YamlEncounterNatureClassic }
  /**
   */
  move_categories: { [key: SnakeCaseString]: MoveCategory } | { [key: SnakeCaseString]: YamlMoveCategory }
  /**
   */
  setting_truths: { [key: SnakeCaseString]: TruthStarforged | TruthClassic } | { [key: SnakeCaseString]: YamlTruthStarforged | YamlTruthClassic }
  /**
   */
  ironlands_regions?: { [key: SnakeCaseString]: IronlandsRegion } | { [key: SnakeCaseString]: YamlIronlandsRegion } | undefined
  /**
   */
  delve_site_themes?: { [key: SnakeCaseString]: DelveSiteTheme } | { [key: SnakeCaseString]: YamlDelveSiteTheme } | undefined
  /**
   */
  delve_site_domains?: { [key: SnakeCaseString]: DelveSiteDomain } | { [key: SnakeCaseString]: YamlDelveSiteDomain } | undefined
  /**
   */
  delve_rarities?: { [key: SnakeCaseString]: DelveRarity } | { [key: SnakeCaseString]: YamlDelveRarity } | undefined
  /**
   */
  oracle_sets: { [key: SnakeCaseString]: OracleSet } | YamlOracleSets
}
