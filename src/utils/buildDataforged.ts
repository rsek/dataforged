import type { AssetType } from "@classes/index.js";
import type { Encounter } from "@classes/index.js";
import type { MoveCategory } from "@classes/index.js";
import type { OracleCategory } from "@classes/index.js";
import type { SettingTruth } from "@classes/index.js";
import { buildAssets } from "@utils/buildAssets.js";
import { buildEncounters } from "@utils/buildEncounters.js";
import { buildMoves } from "@utils/buildMoves.js";
import { buildOracles } from "@utils/buildOracles.js";
import { buildTruths } from "@utils/buildTruths.js";
import { buildLog } from "@utils/logging/buildLog.js";

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
