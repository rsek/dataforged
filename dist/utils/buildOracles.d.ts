import { OracleCategory } from "../classes/index.js";
import type { Gamespace } from "../json_out/common/Gamespace.js";
import type { OracleCategoryName, OracleSubcategoryName } from "../json_out/index.js";
import type { IOracleCategoryYaml } from "../yaml_in/index.js";
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
    Name: OracleCategoryName;
    _parentOf: OracleSubcategoryName[];
}
/**
 * It takes the data from the oracles directory and builds a list of OracleCategory objects.
 * @returns An array of OracleCategory objects.
 */
export declare function buildOracles(gamespace?: Gamespace): OracleCategory[];
//# sourceMappingURL=buildOracles.d.ts.map