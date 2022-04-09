/* eslint-disable no-restricted-imports */
export * from "@json_out/index.js";

import type { IAssetType, IEncounter, IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";
import assets_json from "./starforged-assets.json";
import encounters_json from "./starforged-encounters.json";
import moves_json from "./starforged-moves.json";
import oracles_json from "./starforged-oracles.json";
import setting_truths_json from "./starforged-setting_truths.json";

const data = {
  assets: assets_json as IAssetType[],
  encounters: encounters_json as IEncounter[],
  moves: moves_json as IMoveCategory[],
  oracles: oracles_json as IOracleCategory[],
  truths: setting_truths_json as ISettingTruth[],
};

export { data };