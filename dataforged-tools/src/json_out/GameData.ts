import type { IAssetType, IEncounterNatureInfo, IEncounterStarforged , IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export interface GameDataRoot {
  $schema?: string | undefined;
  "Asset Types": IAssetType[];
  "Encounters": IEncounterStarforged[]|IEncounterNatureInfo[];
  "Move Categories": IMoveCategory[];
  "Oracle Categories": IOracleCategory[];
  "Setting Truths"?: ISettingTruth[];
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export interface Starforged extends GameDataRoot {
  "Encounters": IEncounterStarforged[];
  "Setting Truths": ISettingTruth[];
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export interface Ironsworn extends GameDataRoot {
  "Encounters": IEncounterNatureInfo[];
  "Setting Truths"?: ISettingTruth[];
}