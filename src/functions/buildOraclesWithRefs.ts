import fs from "fs";
import IOracleCategoryData from '../types/oracles/interfaces/IOracleCategoryData';
import buildWithRefs, { refsPath } from './buildWithRefs';
import deepFreezeStrict from "deep-freeze-strict";
import IYamlWithRef from "./IYamlWithRef";
import _ from "lodash";

export interface IOracleCatRoot extends IYamlWithRef {
  Categories: IOracleCategoryData[]
}

export default function buildOraclesWithRefs(referencePath: fs.PathLike = refsPath, ...filePaths: fs.PathLike[]) {
  const builtData = buildWithRefs(referencePath, ...filePaths);
  let result: IOracleCatRoot = {
    _refs: deepFreezeStrict(builtData._refs),
    _templates: deepFreezeStrict(builtData._templates),
    Categories: _.filter(builtData, (value, key) => !key.startsWith("_")) as IOracleCategoryData[]
  };
  return result;
}
