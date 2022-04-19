/* eslint-disable no-restricted-imports */
export * from "@json_out/index.js";

import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";
import assets_json from "./starforged-assets.json" assert { type: "json" };
import encounters_json from "./starforged-encounters.json" assert { type: "json" };
import moves_json from "./starforged-moves.json" assert { type: "json" };
import oracles_json from "./starforged-oracles.json" assert { type: "json" };
import setting_truths_json from "./starforged-setting_truths.json" assert { type: "json" };

/**
 * @public
 */
export interface DataforgedJsonRoot {
  assets: IAssetType[],
  encounters: IEncounterStarforged[],
  moves: IMoveCategory[],
  oracles: IOracleCategory[],
  truths: ISettingTruth[],
};

/**
 * @public
 */
const data: DataforgedJsonRoot = {
  assets: assets_json as IAssetType[],
  encounters: encounters_json as IEncounterStarforged[],
  moves: moves_json as IMoveCategory[],
  oracles: oracles_json as IOracleCategory[],
  truths: setting_truths_json as ISettingTruth[],
};

export { data };