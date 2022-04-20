import type { EncounterNatureInfo } from "@classes/encounters/EncounterNatureInfo.js";
import type { AssetType , EncounterStarforged , MoveCategory , OracleCategory , SettingTruth } from "@classes/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import { buildAssets } from "@utils/buildAssets.js";
import { buildEncounters } from "@utils/buildEncounters.js";
import { buildMoves } from "@utils/buildMoves.js";
import { buildOracles } from "@utils/buildOracles.js";
import { buildTruths } from "@utils/buildTruths.js";
import { dataforgedStats } from "@utils/dataforgedStats.js";
import { buildLog } from "@utils/logging/buildLog.js";

export interface IronswornData {
  assets: AssetType[];
  encounters: EncounterStarforged[] | EncounterNatureInfo[];
  moves: MoveCategory[];
  oracles: OracleCategory[];
  setting_truths: SettingTruth[];
}

/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(gamespace: Gamespace = Gamespace.Starforged): IronswornData {
  buildLog(buildDataforged, `Building Dataforged for ${gamespace}...`);
  const assets = buildAssets(gamespace);
  const encounters = buildEncounters(gamespace);
  const moves = buildMoves(gamespace);
  const oracles = buildOracles(gamespace);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const setting_truths = buildTruths(gamespace);

  const data = {
    assets,
    encounters,
    moves,
    oracles,
    setting_truths
  };
  buildLog(buildDataforged, `Finished building JSON for ${gamespace}:
    ${dataforgedStats(gamespace, data)}`);
  return data;
}
