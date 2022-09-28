import type { AssetType, DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassicInfo, EncounterStarforged, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged } from "@schema";

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export interface GameDataRoot {
  $schema?: string | undefined;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Asset types": {[key: string]: AssetType};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Encounters": {[key:string]:EncounterStarforged}|{[key:string]:EncounterNatureClassicInfo};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Move categories": {[key:string]:MoveCategory};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Oracle sets": {[key:string]:OracleSet};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Setting truths": {[key:string]:TruthStarforged} | {[key:string]:TruthClassic};
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export interface Starforged extends GameDataRoot {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Encounters": {[key:string]:EncounterStarforged};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Setting truths": {[key:string]:TruthStarforged};
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export interface Ironsworn extends GameDataRoot {
  "Encounters": {[key:string]:EncounterNatureClassicInfo};
  "Setting truths": {[key:string]:TruthClassic};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Delve site domains": {[key:string]:DelveSiteDomain};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Delve site themes": {[key:string]:DelveSiteTheme};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  "Ironlands regions": {[key:string]:IronlandsRegion};
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Rarities: {[key:string]:DelveRarity};
}