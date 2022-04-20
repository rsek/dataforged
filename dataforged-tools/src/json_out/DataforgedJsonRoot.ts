import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";

/**
 * @public
 */
export interface DataforgedJsonRoot {
  assets: IAssetType[];
  encounters: IEncounterStarforged[];
  moves: IMoveCategory[];
  oracles: IOracleCategory[];
  truths: ISettingTruth[];
}