import { Encounter } from "@dataforged/classes/encounters/Encounter.js";
import type { ISource } from "@dataforged/json_out/index.js";
import { getYamlFiles } from "@dataforged/utils/io/getYamlFiles.js";
import { buildLog } from "@dataforged/utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@dataforged/utils/process_yaml/concatWithYamlRefs.js";
import type { IEncounterYaml, IYamlWithRef } from "@dataforged/yaml_in/index.js";
import _ from "lodash-es";

const filesEncounters = getYamlFiles().filter(file => file.toString().match("encounter"));

interface IEncounterRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: IEncounterYaml[];
}

/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters(): Encounter[] {
  buildLog(buildEncounters, "Building encounters...");
  const encounterRoot = concatWithYamlRefs(undefined, ...filesEncounters) as IEncounterRoot;
  const json = encounterRoot.Encounters.map(enc => new Encounter(enc, encounterRoot.Source));
  const variantCount = _.sum(json.map(enc => enc.Variants?.length));
  buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
  return json;
}