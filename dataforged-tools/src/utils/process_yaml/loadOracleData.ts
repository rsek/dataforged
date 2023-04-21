
import { REFS_PATH } from "@constants/index.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IOracleCategoryYaml } from "@yaml_in/index.js";
import type { IOracleCatRoot } from "@yaml_in/oracles/IOracleCatRoot.js";
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";

/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export function loadOracleData(referencePath: string = REFS_PATH, ...filePaths: string[]) {
  const builtData = concatWithYamlRefs<Record<string, IOracleCategoryYaml>>(referencePath, ...filePaths);
  const result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
  };
  return result;
}
