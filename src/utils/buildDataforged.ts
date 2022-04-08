import type { AssetType } from "@dataforged/classes/assets/AssetType.js";
import type { Encounter } from "@dataforged/classes/encounters/Encounter.js";
import type { MoveCategory } from "@dataforged/classes/moves/MoveCategory.js";
import type { OracleCategory } from "@dataforged/classes/oracles/OracleCategory.js";
import type { SettingTruth } from "@dataforged/classes/setting_truths/SettingTruth.js";
import { buildAssets } from "@dataforged/utils/buildAssets.js";
import { buildEncounters } from "@dataforged/utils/buildEncounters.js";
import { buildMoves } from "@dataforged/utils/buildMoves.js";
import { buildOracles } from "@dataforged/utils/buildOracles.js";
import { buildTruths } from "@dataforged/utils/buildTruths.js";
import { buildLog } from "@dataforged/utils/logging/buildLog.js";

export interface IronswornData {
  assets: AssetType[];
  encounters: Encounter[];
  moves: MoveCategory[];
  oracles: OracleCategory[];
  setting_truths: SettingTruth[];
}

/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(): IronswornData {
  buildLog(buildDataforged, "Building Dataforged...");
  const assets = buildAssets();
  const encounters = buildEncounters();
  const moves = buildMoves();
  const oracles = buildOracles();
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
