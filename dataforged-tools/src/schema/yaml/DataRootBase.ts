import { AssetType, DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassic, EncounterStarforged, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged, YamlAssetType, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNatureClassic, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlTruthClassic, YamlTruthStarforged } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { YamlOracleSets } from './common/YamlDataRoot'
/**
 * @internal
 */
export interface DataRootBase extends Record<string, { [key: SnakeCaseString]: unknown } | undefined> {
  asset_types: { [key: SnakeCaseString]: YamlAssetType } | { [key: SnakeCaseString]: AssetType }
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  encounters: { [key: SnakeCaseString]: EncounterStarforged }
  | { [key: SnakeCaseString]: EncounterNatureClassic }
  | { [key: SnakeCaseString]: YamlEncounterStarforged }
  | { [key: SnakeCaseString]: YamlEncounterNatureClassic }
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'move_categories': { [key: SnakeCaseString]: MoveCategory } | { [key: SnakeCaseString]: YamlMoveCategory }
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'setting_truths': { [key: SnakeCaseString]: TruthStarforged | TruthClassic } | { [key: SnakeCaseString]: YamlTruthStarforged | YamlTruthClassic }
  /**
   * @patternProperties ^[A-Z][A-z '-]+$
   */
  'ironlands_regions'?: { [key: SnakeCaseString]: IronlandsRegion } | { [key: SnakeCaseString]: YamlIronlandsRegion } | undefined
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'delve_site_themes'?: { [key: SnakeCaseString]: DelveSiteTheme } | { [key: SnakeCaseString]: YamlDelveSiteTheme } | undefined
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'delve_site_domains'?: { [key: SnakeCaseString]: DelveSiteDomain } | { [key: SnakeCaseString]: YamlDelveSiteDomain } | undefined
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  rarities?: { [key: SnakeCaseString]: DelveRarity } | { [key: SnakeCaseString]: YamlDelveRarity } | undefined
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'oracle_sets': { [key: SnakeCaseString]: OracleSet } | YamlOracleSets
}
