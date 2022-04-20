import { Oracle, OracleCategoryDisplay, OracleUsage, SourceInheritor } from "../index.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { IOracleCategory, OracleCategoryId, OracleCategoryJaggedId, OracleCategoryName } from "../../json_out/index.js";
import type { IOracleCategoryYaml, IOracleYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class OracleCategory extends SourceInheritor implements IOracleCategory {
    $id: OracleCategoryId;
    Name: OracleCategoryName;
    Aliases?: string[] | undefined;
    Category?: OracleCategoryJaggedId | undefined;
    Description?: string | undefined;
    Display: OracleCategoryDisplay;
    Usage?: OracleUsage | undefined;
    Oracles?: Oracle[] | undefined;
    Categories?: OracleCategory[] | undefined;
    "Sample Names"?: string[];
    constructor(json: IOracleCategoryYaml, gamespace: Gamespace, category?: OracleCategoryJaggedId | undefined, ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]);
}
//# sourceMappingURL=OracleCategory.d.ts.map