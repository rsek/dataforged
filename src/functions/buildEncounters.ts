import t from 'ts-runtime/lib';

import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs";
import { Encounter, IEncounterYaml } from "../types/encounters/Encounter";
import ISource from "../types/general/interfaces/ISource";
import getYamlFiles from "./io/getYamlFiles";
import _ from "lodash";
import IYamlWithRef from './IYamlWithRef';
import buildLog from './logging/buildLog';

const filesEncounters = getYamlFiles().filter(file => file.toString().match("encounter"));

interface IEncounterRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: IEncounterYaml[];
}

export default function buildEncounters(): Encounter[] {
  buildLog(buildEncounters, "Building encounters...");
  const encounterRoot = concatWithYamlRefs(undefined, ...filesEncounters) as IEncounterRoot;
  const json = encounterRoot.Encounters.map(enc => new Encounter(enc, encounterRoot.Source));
  const variantCount = _.sum(json.map(enc => enc.Variants?.length));
  buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
  return json;
}