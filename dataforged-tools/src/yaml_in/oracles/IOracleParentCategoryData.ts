//License: MIT
import type { IOracleCategory } from "@json_out/index.js";
import type { IOracleCategoryYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
  Name: string;
  _parentOf: IOracleCategory["Name"][];
}
