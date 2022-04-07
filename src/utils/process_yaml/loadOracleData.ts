
import REFS_PATH from "@dataforged/constants/refsPath.js";
import type IYamlWithRef from "@dataforged/interfaces/yaml_in/common/IYamlWithRef.js";
import type IOracleCategoryYaml from "@dataforged/interfaces/yaml_in/oracles/IOracleCategoryYaml.js";
import concatWithYamlRefs from "@dataforged/utils/process_yaml/concatWithYamlRefs.js";
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
export default function loadOracleData(referencePath: fs.PathLike = REFS_PATH, ...filePaths: fs.PathLike[]) {
  const builtData = concatWithYamlRefs<Record<string, IOracleCategoryYaml>>(referencePath, ...filePaths);
  const result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
  };
  return result;
}
