import type { HasSource, YamlAssetType, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNature, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlOracleSet, YamlOracleTable, YamlTruthClassic, YamlTruthStarforged, YamlWithRef } from '@schema'
import { DataRootBase } from "../DataRootBase"

/**
 * @internal
 */
export interface YamlDataRoot extends YamlWithRef, HasSource { }

/**
 * @internal
 */
export interface YamlAssetRoot extends YamlDataRoot, Pick<DataRootBase, "Asset types"> {
  'Asset types': {[key: string]: YamlAssetType}
}

/**
 * @internal
 */
export interface YamlEncounterRoot extends YamlDataRoot, Pick<DataRootBase, "Encounters"> {
  Encounters: { [key: string]: YamlEncounterStarforged |YamlEncounterNature}
}

/**
 * @internal
 */
export interface YamlEncounterStarforgedRoot extends YamlEncounterRoot {
  Encounters: { [key: string]: YamlEncounterStarforged }
}

/**
 * @internal
 */
export interface YamlEncounterClassicRoot extends YamlEncounterRoot {
  Encounters: { [key: string]: YamlEncounterNature}
}

/**
 * @internal
 */
export interface YamlMoveRoot extends YamlDataRoot, Pick<DataRootBase, "Move categories"> {
  'Move categories': { [key: string]: YamlMoveCategory}
}

/**
 * @internal
 */
export interface YamlTruthRoot extends YamlDataRoot, Pick<DataRootBase, "Setting truths"> {
  'Setting truths': {
    [key: string]: YamlTruthStarforged|YamlTruthClassic
  }
}

/**
 * @internal
 */
export interface YamlTruthRootStarforged extends YamlTruthRoot {
  'Setting truths': {[key: string]: YamlTruthStarforged}
}

/**
 * @internal
 */
export interface YamlTruthRootClassic extends YamlTruthRoot {
  'Setting truths': { [key: string]: YamlTruthClassic}
}

/**
 * Schema for files that contain one or more oracle sets.
 * @internal
 */
export interface YamlOracleRoot extends YamlDataRoot, Pick<DataRootBase, 'Oracle sets'> {
  'Oracle sets': YamlOracleSets
}

/**
 * @internal
 */
export interface YamlOracleSets  {
  [key: string]: YamlOracleSet | {
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Sets?: {
      [key: string]: Partial<YamlOracleSet> & {
        _templateOracleSet: Partial<YamlOracleSet>
      }
    } | undefined
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Tables?: {
      [key: string]: Partial<YamlOracleTable> & {
        _templateOracleTable: Partial<YamlOracleTable>
      }
    } | undefined
  }
}

/**
 * @internal
 */
export interface YamlIronlandsRegionRoot extends YamlDataRoot, Pick<DataRootBase, "Ironlands regions"> {
  'Ironlands regions': { [key: string]: YamlIronlandsRegion }
}

/**
 * @internal
 */
export interface YamlDelveSiteThemeRoot extends YamlDataRoot, Pick<DataRootBase,'Delve site themes'> {
  'Delve site themes': { [key: string]: YamlDelveSiteTheme}
}

/**
 * @internal
 */
export interface YamlDelveSiteDomainRoot extends YamlDataRoot, Pick<DataRootBase, 'Delve site domains'> {
  'Delve site domains': { [key: string]: YamlDelveSiteDomain}
}

/**
 * @internal
 */
export interface YamlDelveRarityRoot extends YamlDataRoot, Pick<DataRootBase,'Rarities'> {
  Rarities: { [key: string]: YamlDelveRarity}
}
