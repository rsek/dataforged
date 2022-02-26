import t from 'ts-runtime/lib';

import buildWithRefs from "./buildWithRefs";
import { Encounter, IEncounterData } from "../types/encounters/Encounter";
import ISource from "../types/general/interfaces/ISource";
import getYamlFiles from "./getYamlFiles";
import _ from "lodash";
import IYamlWithRef from './IYamlWithRef';

const filesEncounters = getYamlFiles().filter(file => file.toString().match("encounter"));

interface IEncounterRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Encounters: IEncounterData[];
}

export default function buildEncounters(): Encounter[] {
  console.info("[buildEncounters] Building encounters...");
  const encounterRoot = buildWithRefs(undefined, ...filesEncounters) as IEncounterRoot;
  const json = encounterRoot.Encounters.map(enc => new Encounter(enc, encounterRoot.Source));
  const variantCount = _.sum(json.map(enc => enc.Variants?.length));
  console.info(`[buildEncounters] Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
  return json;
}