import type { EncounterNatureInfo } from "@classes/encounters/EncounterNatureInfo.js";
import type { AssetType , EncounterStarforged , MoveCategory , OracleCategory , SettingTruth } from "@classes/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { Ironsworn } from "@json_out/Ironsworn.js";
import type { Starforged } from "@json_out/Starforged.js";
import { buildAssets } from "@utils/buildAssets.js";
import { buildEncounters } from "@utils/buildEncounters.js";
import { buildMoves } from "@utils/buildMoves.js";
import { buildOracles } from "@utils/buildOracles.js";
import { buildTruths } from "@utils/buildTruths.js";
import { dataforgedStats } from "@utils/dataforgedStats.js";
import { buildLog } from "@utils/logging/buildLog.js";

/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export function buildDataforged(gamespace: Gamespace = Gamespace.Starforged) {
  buildLog(buildDataforged, `Building Dataforged for ${gamespace}...`);
  const assets = buildAssets(gamespace);
  const encounters = buildEncounters(gamespace);
  const moves = buildMoves(gamespace);
  const oracles = buildOracles(gamespace);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const truths = buildTruths(gamespace);
  let data: Ironsworn|Starforged;
  switch (gamespace) {
    case Gamespace.Starforged: {
      data = {
        $schema: "./schema.json",
        assets,
        encounters: encounters as EncounterStarforged[],
        moves,
        oracles,
        truths
      };
      break;}
    case Gamespace.Ironsworn:{
      data = {
        $schema: "./schema.json",
        assets,
        encounters: encounters as EncounterNatureInfo[],
        moves,
        oracles,
        truths
      };
      break;
    }
    default:
      throw new Error();
  }

  buildLog(buildDataforged, `Finished building JSON for ${gamespace}:
    ${dataforgedStats(gamespace, data)}`);
  return data;
}
