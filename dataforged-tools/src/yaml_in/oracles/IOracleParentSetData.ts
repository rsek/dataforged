import type { IOracleSet } from "@json_out/index.js";
import type { IOracleSetYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IOracleParentSetData extends IOracleSetYaml {
  _parentOf: IOracleSet["Title"]["Canonical"][];
}
