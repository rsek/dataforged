

import _ from "lodash-es";
import getYamlFiles from "./io/getYamlFiles.js";
import type IYamlWithRef from "./IYamlWithRef.js";
import buildLog from "./logging/buildLog.js";
import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs.js";
import Encounter from "../types/encounters/Encounter.js";
import type IEncounterYaml from "../types/encounters/IEncounterYaml.js";
import type ISource from "../types/general/interfaces/ISource.js";

const filesEncounters = getYamlFiles().filter(file => file.toString().match("encounter"));

interface IEncounterRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: IEncounterYaml[];
}

/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @date 4/5/2022 - 1:48:10 AM
 *
 * @export
 * @returns {Encounter[]}
 */
export default function buildEncounters(): Encounter[] {
  buildLog(buildEncounters, "Building encounters...");
  const encounterRoot = concatWithYamlRefs(undefined, ...filesEncounters) as IEncounterRoot;
  const json = encounterRoot.Encounters.map(enc => new Encounter(enc, encounterRoot.Source));
  const variantCount = _.sum(json.map(enc => enc.Variants?.length));
  buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
  return json;
}