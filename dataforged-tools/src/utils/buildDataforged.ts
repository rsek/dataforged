import type { EncounterNatureInfo } from "@classes/cyclopedia/EncounterNatureInfo.js";
import type { EncounterStarforged } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { Ironsworn , Starforged } from "@json_out/index.js";
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
        // $schema: "./schema.json",
        "Asset Types": assets,
        Encounters: encounters as EncounterStarforged[],
        "Move Categories": moves,
        "Oracle Categories": oracles,
        "Setting Truths": truths
      } as Starforged;
      break;}
    case Gamespace.Ironsworn:{
      data = {
        // $schema: "./schema.json",
        "Asset Types": assets,
        Encounters: encounters as EncounterNatureInfo[],
        "Move Categories": moves,
        "Oracle Categories": oracles,
        "Setting Truths": truths
      } as Ironsworn;
      break;
    }
    default:
      throw new Error();
  }

  buildLog(buildDataforged, `Finished building JSON for ${gamespace}:
    ${dataforgedStats(gamespace, data)}`);
  return data;
}
