import type { IOracleParentCategoryData } from "@dataforged/utils/buildOracles.js";
import type { IOracleCatRoot } from "@dataforged/utils/process_yaml/loadOracleData.js";

export interface IOracleParentCatRoot extends IOracleCatRoot {
  Categories: IOracleParentCategoryData[];
}
