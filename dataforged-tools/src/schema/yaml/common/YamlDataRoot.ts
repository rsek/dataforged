import type { HasSource, YamlAssetType, YamlDelveDomain, YamlDelveTheme, YamlEncounterNatureInfo, YamlEncounterStarforged, YamlIronswornRegion, YamlMoveCategory, YamlOracleSet, YamlOracleTable, YamlTruth, YamlTruthClassic , YamlWithRef } from "@schema";

/**
 * @internal
 */
export interface YamlDataRoot extends YamlWithRef, HasSource {
  $schema?: string | undefined;
}

/**
 * @internal
 */
export interface YamlAssetRoot extends YamlDataRoot {
  "Asset Types": {[key: string]: YamlAssetType}
}


/**
 * @internal
 */
export interface YamlEncounterRoot extends YamlDataRoot {
  Encounters: {[key:string]: YamlEncounterStarforged |YamlEncounterNatureInfo;}
}

/**
 * @internal
 */
export interface YamlEncounterRootStarforged extends YamlEncounterRoot {
  Encounters: {[key:string]: YamlEncounterStarforged }
}

/**
 * @internal
 */
export interface YamlEncounterRootClassic extends YamlEncounterRoot {
  Encounters: {[key:string]: YamlEncounterNatureInfo;}
}

/**
 * @internal
 */
export interface YamlMoveRoot extends YamlDataRoot {
  "Move Categories": {[key:string]:YamlMoveCategory};
}

/**
 * @internal
 */
export interface YamlTruthRoot extends YamlDataRoot {
  "Setting Truths": {[key:string]:YamlTruth};
}

/**
 * @internal
 */
export interface YamlTruthRootClassic extends YamlDataRoot {
  "Setting Truths": {[key:string]:YamlTruthClassic}
 }


/**
 * @internal
 */
export interface YamlOracleSetsRoot extends YamlWithRef {
  "Oracle Sets": { [key:string]: YamlOracleSetsItems };
}

/**
 * Schema for files that contain one or more oracle sets.
 * @internal
 */
export interface YamlOracleSetsItems {
  [key: string]: YamlOracleSet | {
    Sets?: {[key: string]: Partial<YamlOracleSet> & {_templateOracleSet: Partial<YamlOracleSet>}} | undefined
    Tables?: {[key: string]: Partial<YamlOracleTable> & {_templateOracleTable: Partial<YamlOracleTable>}} | undefined
  }
}

/**
 * @internal
 */
export interface YamlIronlandsRegionRoot extends YamlDataRoot {
  Regions: { [key:string]: YamlIronswornRegion };
}

/**
 * @internal
*/
export interface YamlDelveSiteRoot extends YamlDataRoot {
  Themes?: {[key:string]:YamlDelveTheme} | undefined;
  Domains?: {[key:string]:YamlDelveDomain} | undefined;
}