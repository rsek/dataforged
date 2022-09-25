import { EncounterNatureClassicInfoBuilder } from "@builders";
import { EncounterStarforgedBuilder } from "@builders";
import { MASTER_DATA_PATH } from "@constants";
import { Game, Starforged } from "@schema";
import { YamlEncounterRootStarforged, YamlEncounterRootClassic } from "@schema";
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
export function buildEncounters<G extends Game>(gamespace: G) {
  type EncounterRootJson = G extends Starforged ? EncounterStarforgedBuilder : EncounterNatureClassicInfoBuilder;
  type EncounterRootYaml = G extends Starforged ? YamlEncounterRootStarforged : YamlEncounterRootClassic
  buildLog(buildEncounters, "Building encounters...");
  const encounterFiles = fg.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
  console.log(encounterFiles);
  const encounterRootYaml = concatWithYamlRefs<EncounterRootYaml>(undefined, ...encounterFiles) as EncounterRootYaml;
  let result;

  switch (gamespace) {
    case Game.Starforged: {
      result = _.mapValues((encounterRootYaml as YamlEncounterRootStarforged).Encounters,enc => new EncounterStarforgedBuilder(enc, encounterRootYaml.Source)) as {
    [key: string]: EncounterStarforgedBuilder}
      break;
    }
    case Game.Ironsworn: {
      result = _.mapValues((encounterRootYaml as YamlEncounterRootClassic).Encounters,enc => new EncounterNatureClassicInfoBuilder(enc, encounterRootYaml.Source));
      break;
    }
    default:
      throw badJsonError(buildEncounters);
  }
  buildLog(buildEncounters, `Finished building ${encounterStats(gamespace, result)}`);
  switch (gamespace) {
    case Game.Starforged:
      return result as {[key: string]: EncounterStarforgedBuilder};
    case Game.Ironsworn:
      return result as {[key: string]: EncounterNatureClassicInfoBuilder};
    default:
      throw badJsonError(buildEncounters);
  }
}