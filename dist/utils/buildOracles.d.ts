import { OracleCategory } from "../../dist/classes/oracles/OracleCategory.js";
import type { OracleCategoryName, OracleSubcategoryName } from "@dataforged/json_out/index.js";
import type { IOracleCategoryYaml } from "@dataforged/yaml_in/index.js";
export interface IOracleParentCategoryData extends IOracleCategoryYaml {
    Name: OracleCategoryName;
    _parentOf: OracleSubcategoryName[];
}
export declare function buildOracles(): OracleCategory[];
//# sourceMappingURL=buildOracles.d.ts.map