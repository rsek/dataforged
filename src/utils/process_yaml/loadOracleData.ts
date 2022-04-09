
import { REFS_PATH } from "@constants/index.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IOracleCategoryYaml, IYamlWithRef } from "@yaml_in/index.js";
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";
import type fs from "fs";

export interface IOracleCatRoot extends IYamlWithRef {
  Categories: IOracleCategoryYaml[];
}

/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export function loadOracleData(referencePath: fs.PathLike = REFS_PATH, ...filePaths: fs.PathLike[]) {
  const builtData = concatWithYamlRefs<Record<string, IOracleCategoryYaml>>(referencePath, ...filePaths);
  const result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
  };
  return result;
}
