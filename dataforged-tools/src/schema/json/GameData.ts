import type { AssetType, DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassicInfo, EncounterStarforged, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged } from "@schema";

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export interface GameDataRoot {
  "Asset types": {[key: string]: AssetType};
  "Encounters": {[key:string]:EncounterStarforged}|{[key:string]:EncounterNatureClassicInfo};
  "Move categories": {[key:string]:MoveCategory};
  "Oracle sets": {[key:string]:OracleSet};
  "Setting truths": {[key:string]:TruthStarforged} | {[key:string]:TruthClassic};
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export interface Starforged extends GameDataRoot {
  "Encounters": {[key:string]:EncounterStarforged};
  "Setting truths": {[key:string]:TruthStarforged};
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export interface Ironsworn extends GameDataRoot {
  "Encounters": {[key:string]:EncounterNatureClassicInfo};
  "Setting truths": {[key:string]:TruthClassic};
  "Delve site domains": {[key:string]:DelveSiteDomain};
  "Delve site themes": {[key:string]:DelveSiteTheme};
  "Ironlands regions": {[key:string]:IronlandsRegion};
  Rarities: {[key:string]:DelveRarity};
}