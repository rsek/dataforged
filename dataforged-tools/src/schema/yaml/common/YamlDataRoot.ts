import type { HasSource, YamlAssetType, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNatureInfo, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlOracleSet, YamlOracleTable, YamlTruthClassic, YamlTruthStarforged , YamlWithRef } from "@schema";

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
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Asset types": {[key: string]: YamlAssetType}
}


/**
 * @internal
 */
export interface YamlEncounterRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Encounters: { [key:string]: YamlEncounterStarforged |YamlEncounterNatureInfo;}
}

/**
 * @internal
 */
export interface YamlEncounterStarforgedRoot extends YamlEncounterRoot {
  Encounters: { [key:string]: YamlEncounterStarforged }
}

/**
 * @internal
 */
export interface YamlEncounterClassicRoot extends YamlEncounterRoot {
  Encounters: { [key:string]: YamlEncounterNatureInfo;}
}

/**
 * @internal
 */
export interface YamlMoveRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Move categories": { [key:string]:YamlMoveCategory};
}

/**
 * @internal
 */
export interface YamlTruthRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Setting truths": {
    [key:string]:YamlTruthStarforged|YamlTruthClassic
  };
}

/**
 * @internal
 */
export interface YamlTruthRootStarforged extends YamlTruthRoot {
  "Setting truths": {[key:string]:YamlTruthStarforged};
}

/**
 * @internal
 */
export interface YamlTruthRootClassic extends YamlTruthRoot {
  "Setting truths": { [key:string]:YamlTruthClassic}
 }

/**
 * Schema for files that contain one or more oracle sets.
 * @internal
 */
export interface YamlOracleRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Oracle sets": {
    [key: string]: YamlOracleSet | {
      /**
       * @patternProperties ^[A-Z][a-z '-]+$
       */
      Sets?: {
        [key: string]: Partial<YamlOracleSet> & {_templateOracleSet: Partial<YamlOracleSet>}
      } | undefined

      /**
       * @patternProperties ^[A-Z][a-z '-]+$
       */
      Tables?: {
        [key: string]: Partial<YamlOracleTable> & {_templateOracleTable: Partial<YamlOracleTable>}
      } | undefined
  } };
}

/**
 * @internal
 */
export interface YamlIronlandsRegionRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Ironlands regions": { [key:string]: YamlIronlandsRegion };
}

/**
 * @internal
 */
export interface YamlDelveSiteThemeRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Delve site themes": { [key:string]:YamlDelveSiteTheme} ;
}

/**
 * @internal
 */
export interface YamlDelveSiteDomainRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Delve site domains": { [key:string]:YamlDelveSiteDomain};
}

/**
 * @internal
 */
export interface YamlDelveRarityRoot extends YamlDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Rarities: { [key: string]: YamlDelveRarity}
}