import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";
import type fs from "fs";
import concatWithYamlRefs, { refsPath } from "./concatWithYamlRefs.js";
import type IOracleCategoryYaml from "../../types/oracles/interfaces/yaml/IOracleCategoryYaml.js";
import type IYamlWithRef from "../IYamlWithRef.js";

export interface IOracleCatRoot extends IYamlWithRef {
  Categories: IOracleCategoryYaml[]
}

export default function loadOracleData(referencePath: fs.PathLike = refsPath, ...filePaths: fs.PathLike[]) {
  const builtData = concatWithYamlRefs(referencePath, ...filePaths);
  const result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: _.filter(builtData, (value, key) => !key.startsWith("_")) as IOracleCategoryYaml[]
  };
  return result;
}
