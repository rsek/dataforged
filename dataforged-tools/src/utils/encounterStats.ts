import type { EncounterNatureInfo } from "@classes/encounters/EncounterNatureInfo.js";
import type { EncounterStarforged } from "@classes/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { IEncounterNatureInfo } from "@json_out/encounters/IEncounterNatureInfo";
import type { IEncounterStarforged } from "@json_out/index.js";
import _ from "lodash-es";

/**
 * Creates a string of encounter stats for use in build messages.
 * @param gamespace
 * @param json
 */
export function encounterStats<G extends Gamespace>(gamespace: G, json: EncounterStarforged[] | EncounterNatureInfo[]) {
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
