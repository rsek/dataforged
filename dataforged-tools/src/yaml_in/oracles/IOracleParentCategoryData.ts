import type { IOracleCategory } from "@json_out/index.js";
import type { IOracleCategoryYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
  _parentOf: IOracleCategory["Title"]["Canonical"][];
}
