import { OracleCategory } from "../classes/index.js";
import type { OracleCategoryName, OracleSubcategoryName } from "../json_out/index.js";
import type { IOracleCategoryYaml } from "../yaml_in/index.js";
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
    Name: OracleCategoryName;
    _parentOf: OracleSubcategoryName[];
}
export declare function buildOracles(): OracleCategory[];
//# sourceMappingURL=buildOracles.d.ts.map