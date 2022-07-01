//License: MIT
import type { IOracleCatRoot } from "@yaml_in/oracles/IOracleCatRoot";
import type { IOracleParentCategoryData } from "@yaml_in/oracles/IOracleParentCategoryData";
/**
 * @internal
 */
export interface IOracleParentCatRootYaml extends IOracleCatRoot {
  Categories: IOracleParentCategoryData[];
}
