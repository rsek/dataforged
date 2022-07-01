//License: MIT
import type { EncounterNatureInfo, EncounterStarforged, Oracle, Row } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { GameDataRoot, IEncounterNatureInfo, IEncounterStarforged , IOracleCategory , Ironsworn , Starforged } from "@json_out/index.js";
import { JSONPath } from "jsonpath-plus";
import _ from "lodash-es";

/**
 * Extracts statistics on Ironsworn game data.
 * @param param0
 */
export function dataforgedStats<G extends Gamespace>(gamespace: G, { "Asset Types": assets, Encounters: encounters, "Move Categories": moves, "Oracle Categories": oracles, "Setting Truths": truths }: GameDataRoot) {
  const assetCount = _.sum(assets.map(item => item.Assets.length));
  const moveCount = _.sum(moves.map(item => item.Moves.length));
  return `${assetCount} assets comprising ${assets.length} types,
    ${encounterStats(gamespace, encounters)},
    ${moveCount} moves in ${moves.length} categories,
    ${oracleStats(oracles)},
    and ${truths?.length ?? 0} setting truth categories.`;
}

/**
 * Creates a string of oracle stats for use in build messages.
 * @param oracles
 */
export function oracleStats(oracles: IOracleCategory[]) {
  const oracleTables = JSONPath<Oracle[]>({ path: "$..Oracles[*][Table]", json: oracles });
  const oracleSubtables = JSONPath<Row[]>({ json: oracleTables, path: "$..Subtable" });
  return `${oracleTables.length + oracleSubtables.length} oracle tables in ${oracles.length} categories`;
}


/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export function encounterStats<G extends Gamespace>(gamespace: G, json: IEncounterStarforged[] | IEncounterNatureInfo[]) {
  let text: string;
  switch (gamespace) {
    case Gamespace.Starforged: {
      const encounterCount = json.length;
      const variantCount = _.sum((json as IEncounterStarforged[]).map(enc => enc.Variants?.length)) ?? 0;
      text = `${encounterCount} encounters (plus ${variantCount} encounter variants)`;
    }
      break;
    case Gamespace.Ironsworn: {
      const natureCount = json.length;
      const encounterCount = _.sum((json as IEncounterNatureInfo[]).map(enc => enc.Encounters.length));
      text = `${encounterCount} encounters across ${natureCount} nature types`;
    }
      break;
    default:
      throw new Error();
  }
  return text;
}
;
