
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";
import type fs from "fs";
import concatWithYamlRefs, { refsPath } from "./concatWithYamlRefs.js";
import type IOracleCategoryYaml from "../../types/oracles/interfaces/yaml/IOracleCategoryYaml.js";
import type IYamlWithRef from "../IYamlWithRef.js";

export interface IOracleCatRoot extends IYamlWithRef {
  Categories: IOracleCategoryYaml[];
}

/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param {fs.PathLike[]} filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export default function loadOracleData(referencePath: fs.PathLike = refsPath, ...filePaths: fs.PathLike[]) {
  const builtData = concatWithYamlRefs<Record<string, IOracleCategoryYaml>>(referencePath, ...filePaths);
  const result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
  };
  return result;
}
