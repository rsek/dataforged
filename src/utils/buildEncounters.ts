import { Encounter } from "@classes/index.js";
import type { ISource } from "@json_out/index.js";
import { getYamlFiles } from "@utils/io/getYamlFiles.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IEncounterYaml, IYamlWithRef } from "@yaml_in/index.js";
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