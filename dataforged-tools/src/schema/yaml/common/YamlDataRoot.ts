import type { HasSource, YamlAssetType, YamlDelveDomain, YamlDelveRarity, YamlDelveTheme, YamlEncounterNatureInfo, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlOracleSet, YamlOracleTable, YamlTruthClassic, YamlTruthStarforged , YamlWithRef } from "@schema";

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
export interface YamlEncounterStarforgedRoot extends YamlEncounterRoot {
  Encounters: {[key:string]: YamlEncounterStarforged }
}

/**
 * @internal
 */
export interface YamlEncounterClassicRoot extends YamlEncounterRoot {
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
  "Setting Truths": {
    [key:string]:YamlTruthStarforged|YamlTruthClassic
  };
}

/**
 * @internal
 */
export interface YamlTruthRootStarforged extends YamlTruthRoot {
  "Setting Truths": {[key:string]:YamlTruthStarforged};
}

/**
 * @internal
 */
export interface YamlTruthRootClassic extends YamlTruthRoot {
  "Setting Truths": {[key:string]:YamlTruthClassic}
 }


/**
 * Schema for files that contain one or more oracle sets.
 * @internal
 */
export interface YamlOracleRoot extends YamlDataRoot {
  "Oracle Sets": {
    [key: string]: YamlOracleSet | {
      Sets?: {
        [key: string]: Partial<YamlOracleSet> & {_templateOracleSet: Partial<YamlOracleSet>}
      } | undefined
      Tables?: {
        [key: string]: Partial<YamlOracleTable> & {_templateOracleTable: Partial<YamlOracleTable>}
      } | undefined
  } };
}

/**
 * @internal
 */
export interface YamlIronlandsRegionRoot extends YamlDataRoot {
  Regions: { [key:string]: YamlIronlandsRegion };
}

/**
 * @internal
 */
export interface YamlDelveSiteThemeRoot extends YamlDataRoot {
  Themes: {[key:string]:YamlDelveTheme} ;
}

/**
 * @internal
 */
export interface YamlDelveSiteDomainRoot extends YamlDataRoot {
  Domains: {[key:string]:YamlDelveDomain};
}

/**
 * @internal
 */
export interface YamlDelveRarityRoot extends YamlDataRoot {
  Rarities: {[key: string]: YamlDelveRarity}
}