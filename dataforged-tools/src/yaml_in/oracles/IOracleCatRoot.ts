import type { IOracleCategoryYaml, IYamlWithRef } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleCatRoot extends IYamlWithRef {
  Categories: IOracleCategoryYaml[];
}
