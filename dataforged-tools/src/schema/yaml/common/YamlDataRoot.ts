import type { MixinSource, YamlAssetType, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNatureClassic, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlOracleSet, YamlOracleTable, YamlTruthClassic, YamlTruthStarforged, YamlWithRef } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'
import { DataRootBase } from '../DataRootBase'

/**
 * @internal
 */
export interface YamlDataRoot extends YamlWithRef, MixinSource { }

/**
 * @internal
 */
export interface YamlAssetRoot extends YamlDataRoot, Pick<DataRootBase, 'asset_types'> {
  'asset_types': { [key: SnakeCaseString]: YamlAssetType }
}

/**
 * @internal
 */
export interface YamlEncounterRoot extends YamlDataRoot, Pick<DataRootBase, 'Encounters'> {
  encounters: { [key: SnakeCaseString]: YamlEncounterStarforged | YamlEncounterNatureClassic }
}

/**
 * @internal
 */
export interface YamlEncounterStarforgedRoot extends YamlEncounterRoot {
  encounters: { [key: SnakeCaseString]: YamlEncounterStarforged }
}

/**
 * @internal
 */
export interface YamlEncounterClassicRoot extends YamlEncounterRoot {
  encounters: { [key: SnakeCaseString]: YamlEncounterNatureClassic }
}

/**
 * @internal
 */
export interface YamlMoveRoot extends YamlDataRoot, Pick<DataRootBase, 'Move categories'> {
  'move_categories': { [key: SnakeCaseString]: YamlMoveCategory }
}

/**
 * @internal
 */
export interface YamlTruthRoot extends YamlDataRoot, Pick<DataRootBase, 'Setting truths'> {
  'setting_truths': {
    [key: SnakeCaseString]: YamlTruthStarforged | YamlTruthClassic
  }
}

/**
 * @internal
 */
export interface YamlTruthRootStarforged extends YamlTruthRoot {
  'setting_truths': { [key: SnakeCaseString]: YamlTruthStarforged }
}

/**
 * @internal
 */
export interface YamlTruthRootClassic extends YamlTruthRoot {
  'setting_truths': { [key: SnakeCaseString]: YamlTruthClassic }
}

/**
 * Schema for files that contain one or more oracle sets.
 * @internal
 */
export interface YamlOracleRoot extends YamlDataRoot, Pick<DataRootBase, 'Oracle sets'> {
  'oracle_sets': YamlOracleSets
}

/**
 * @internal
 */
export interface YamlOracleSets {
  [key: SnakeCaseString]: YamlOracleSet | {
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    sets?: {
      [key: SnakeCaseString]: Partial<YamlOracleSet> & {
        _templateOracleSet: Partial<YamlOracleSet>
      }
    } | undefined
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    tables?: {
      [key: SnakeCaseString]: Partial<YamlOracleTable> & {
        _templateOracleTable: Partial<YamlOracleTable>
      }
    } | undefined
  }
}

/**
 * @internal
 */
export interface YamlIronlandsRegionRoot extends YamlDataRoot, Pick<DataRootBase, 'Ironlands regions'> {
  ironlands_regions: { [key: SnakeCaseString]: YamlIronlandsRegion }
}

/**
 * @internal
 */
export interface YamlDelveSiteThemeRoot extends YamlDataRoot, Pick<DataRootBase, 'Delve site themes'> {
  delve_site_themes: { [key: SnakeCaseString]: YamlDelveSiteTheme }
}

/**
 * @internal
 */
export interface YamlDelveSiteDomainRoot extends YamlDataRoot, Pick<DataRootBase, 'Delve site domains'> {
  delve_site_domains: { [key: SnakeCaseString]: YamlDelveSiteDomain }
}

/**
 * @internal
 */
export interface YamlDelveRarityRoot extends YamlDataRoot, Pick<DataRootBase, 'Rarities'> {
  rarities: { [key: SnakeCaseString]: YamlDelveRarity }
}
