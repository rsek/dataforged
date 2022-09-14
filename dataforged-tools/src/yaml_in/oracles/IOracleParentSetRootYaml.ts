import type { IOracleParentSetData } from "@yaml_in/oracles/IOracleParentSetData";
import type { IOracleRoot } from "@yaml_in/oracles/IOracleRoot";
/**
 * @internal
 */
export interface IOracleParentSetRootYaml extends IOracleRoot {
  Sets: IOracleParentSetData[];
}
