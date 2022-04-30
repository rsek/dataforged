import { EncounterNatureInfo } from "@classes/encounters/EncounterNatureInfo.js";
import { EncounterStarforged } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { Ironsworn, ISource, Starforged } from "@json_out/index.js";
import { encounterStats } from "@utils/encounterStats.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IEncounterNatureInfoYaml, IEncounterStarforgedYaml, IYamlWithRef } from "@yaml_in/index.js";
import fg from "fast-glob";

type EncountersJson<G extends Gamespace> = G extends Gamespace.Starforged ? EncounterStarforged[] : G extends Gamespace.Ironsworn ? EncounterNatureInfo[] : never;

type EncountersYaml<G extends Gamespace> = G extends Gamespace.Starforged ? IEncounterStarforgedYaml[] : G extends Gamespace.Ironsworn ? IEncounterNatureInfoYaml[] : never;

interface IEncounterRoot<G extends Gamespace> extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: EncountersYaml<G>;
}

/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters<G extends Gamespace>(gamespace: G) {
  buildLog(buildEncounters, "Building encounters...");
  const encounterFiles = fg.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
  console.log(encounterFiles);
  let json: EncounterStarforged[] | EncounterNatureInfo[];
  const encounterRoot = concatWithYamlRefs(undefined, ...encounterFiles) as IEncounterRoot<G>;

  switch (gamespace) {
    case Gamespace.Starforged: {
      json = (encounterRoot.Encounters as IEncounterStarforgedYaml[]).map(enc => new EncounterStarforged(enc, encounterRoot.Source));
      break;
    }
    case Gamespace.Ironsworn: {
      json = (encounterRoot.Encounters as IEncounterNatureInfoYaml[]).map(enc => new EncounterNatureInfo(enc));
      break;
    }
    default:
      throw badJsonError(buildEncounters);
  }
  buildLog(buildEncounters, `Finished building ${encounterStats(gamespace, json)}`);
  switch (gamespace) {
    case Gamespace.Starforged:
      return json as EncounterStarforged[];
    case Gamespace.Ironsworn:
      return json as EncounterNatureInfo[];
    default:
      throw badJsonError(buildEncounters);
  }
}