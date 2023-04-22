import type { IOracleParentCategoryData, IOracleCatRoot } from "@yaml_in/oracles/index.js";
/**
 * @internal
 */
export interface IOracleParentCatRootYaml extends IOracleCatRoot {
  Categories: IOracleParentCategoryData[];
}
