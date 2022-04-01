

import buildAssets from "./buildAssets.js";
import buildEncounters from "./buildEncounters.js";
import buildMoves from "./buildMoves.js";
import buildOracles from "./buildOracles.js";
import buildTruths from "./buildTruths.js";
import buildLog from "./logging/buildLog.js";
import type Asset from "../types/assets/Asset.js";
import type Encounter from "../types/encounters/Encounter.js";
import type MoveCategory from "../types/moves/MoveCategory";
import type OracleCategory from "../types/oracles/classes/OracleCategory.js";
import type SettingTruth from "../types/truths/SettingTruth.js";

export interface IronswornData {
  assets: Asset[];
  encounters: Encounter[];
  moves: MoveCategory[];
  oracles: OracleCategory[];
  setting_truths: SettingTruth[];
}

export default function buildDataforged(): IronswornData {
  buildLog(buildDataforged, "Building Dataforged...");
  const assets = buildAssets();
  const encounters = buildEncounters();
  const moves = buildMoves();
  const oracles = buildOracles();
  const setting_truths = buildTruths();

  buildLog(buildDataforged, `Finished building ${assets.length} assets, ${encounters.length} encounters, ${moves.length} moves, ${oracles.length} oracle categories, and ${setting_truths.length} setting truth categories.`);
  const data = {
    assets,
    encounters,
    moves,
    oracles,
    setting_truths
  };
  return data;
}
