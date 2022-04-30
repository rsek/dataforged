import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";

/**
 * Root object for *Ironsworn: Starforged* data.
 * @public
 */
export interface Starforged {
  $schema?: string | undefined;
  assets: IAssetType[];
  encounters: IEncounterStarforged[];
  moves: IMoveCategory[];
  oracles: IOracleCategory[];
  truths: ISettingTruth[];
}