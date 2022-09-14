import type { IOracleSetYaml, IYamlWithRef } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleRoot extends IYamlWithRef {
  Sets: IOracleSetYaml[];
}
