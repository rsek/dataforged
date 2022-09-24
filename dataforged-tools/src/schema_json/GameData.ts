import type { AssetType, DelveDomain, DelveRarity, DelveTheme, EncounterNatureClassicInfo, EncounterStarforged , IronlandsRegion, MoveCategory, OracleSet, SettingTruthClassic, Truth } from "@schema_json";

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export interface GameDataRoot {
  $schema?: string | undefined;
  "Asset Types": {[key: string]: AssetType};
  "Encounters": {[key:string]:EncounterStarforged}|{[key:string]:EncounterNatureClassicInfo};
  "Move Categories": {[key:string]:MoveCategory};
  "Oracle Sets": {[key:string]:OracleSet};
  "Setting Truths": {[key:string]:Truth} | {[key:string]:SettingTruthClassic};
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export interface Starforged extends GameDataRoot {
  "Encounters": {[key:string]:EncounterStarforged};
  "Setting Truths": {[key:string]:Truth};
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export interface Ironsworn extends GameDataRoot {
  "Encounters": {[key:string]:EncounterNatureClassicInfo};
  "Setting Truths": {[key:string]:SettingTruthClassic};
  "Site Domains": {[key:string]:DelveDomain};
  "Site Themes": {[key:string]:DelveTheme};
  Regions?: {[key:string]:IronlandsRegion};
  Rarities?: {[key:string]:DelveRarity};
}