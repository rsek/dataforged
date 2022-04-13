import { Encounter } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IEncounterYaml, IYamlWithRef } from "@yaml_in/index.js";
import fg from "fast-glob";
import _ from "lodash-es";


interface IEncounterRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: IEncounterYaml[];
}

/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters(gamespace: Gamespace = "Starforged"): Encounter[] {
  buildLog(buildEncounters, "Building encounters...");
  const encounterFiles = fg.sync(`${MASTER_DATA_PATH as string}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
  let json: Encounter[];
  if (!encounterFiles.length) {
    json = [];
  } else {
    const encounterRoot = concatWithYamlRefs(undefined, ...encounterFiles) as IEncounterRoot;
    json = encounterRoot.Encounters.map(enc => new Encounter(enc, gamespace, encounterRoot.Source));
  }
  const variantCount = _.sum(json.map(enc => enc.Variants?.length)) ?? 0;
  buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
  return json;
}