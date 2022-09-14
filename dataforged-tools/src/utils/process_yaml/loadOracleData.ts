
import { REFS_PATH } from "@constants/index.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IOracleSetYaml } from "@yaml_in/index.js";
import type { IOracleRoot } from "@yaml_in/oracles/IOracleRoot.js";
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";

/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export function loadOracleData(referencePath: string = REFS_PATH, ...filePaths: string[]) {
  const builtData = concatWithYamlRefs<Record<string, IOracleSetYaml>>(referencePath, ...filePaths);
  const result: IOracleRoot = {
    _refs: (builtData._refs),
    _templates: (builtData._templates),
    Sets: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
  };
  return result;
}
