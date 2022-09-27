import { EncounterNatureClassicInfoBuilder } from "@builders";
import { EncounterStarforgedBuilder } from "@builders";
import { MASTER_DATA_PATH } from "@constants";
import { Game, Starforged } from "@schema";
import { YamlEncounterStarforgedRoot, YamlEncounterClassicRoot } from "@schema";
import { encounterStats } from "@utils/dataforgedStats.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/yaml/concatWithYamlRefs.js";
import fg from "fast-glob";
import _ from "lodash";

/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters<G extends Game>(game: G) {
  type EncounterRootJson = G extends Starforged ? EncounterStarforgedBuilder : EncounterNatureClassicInfoBuilder;
  type EncounterRootYaml = G extends Starforged ? YamlEncounterStarforgedRoot : YamlEncounterClassicRoot
  buildLog(buildEncounters, "Building encounters...");
  const encounterFiles = fg.sync(`${MASTER_DATA_PATH as string}/${game}/Encounters*.(yml|yaml)`, { onlyFiles: true });
  console.log(encounterFiles);
  const encounterRootYaml = concatWithYamlRefs<EncounterRootYaml>(undefined, ...encounterFiles) as EncounterRootYaml;
  let result;

  switch (game) {
    case Game.Starforged: {
      result = _.mapValues((encounterRootYaml as YamlEncounterStarforgedRoot).Encounters,enc => new EncounterStarforgedBuilder(enc, encounterRootYaml.Source)) as {
    [key: string]: EncounterStarforgedBuilder}
      break;
    }
    case Game.Ironsworn: {
      result = _.mapValues((encounterRootYaml as YamlEncounterClassicRoot).Encounters,enc => new EncounterNatureClassicInfoBuilder(enc, encounterRootYaml.Source));
      break;
    }
    default:
      throw badJsonError(buildEncounters);
  }
  buildLog(buildEncounters, `Finished building ${encounterStats(game, result)}`);
  switch (game) {
    case Game.Starforged:
      return result as {[key: string]: EncounterStarforgedBuilder};
    case Game.Ironsworn:
      return result as {[key: string]: EncounterNatureClassicInfoBuilder};
    default:
      throw badJsonError(buildEncounters);
  }
}