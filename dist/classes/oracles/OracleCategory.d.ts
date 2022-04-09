import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { Oracle } from "../../../dist/classes/oracles/Oracle.js";
import { OracleCategoryDisplay } from "../../../dist/classes/oracles/OracleCategoryDisplay.js";
import { OracleUsage } from "../../../dist/classes/oracles/OracleUsage.js";
import type { IOracleCategory, OracleCategoryId, OracleCategoryJaggedId, OracleCategoryName, ParagraphsString } from "@dataforged/json_out/index.js";
import type { IOracleCategoryYaml, IOracleYaml } from "@dataforged/yaml_in/index.js";
export declare class OracleCategory extends SourceInheritor implements IOracleCategory {
    $id: OracleCategoryId;
    Name: OracleCategoryName;
    Aliases?: string[] | undefined;
    Category?: OracleCategoryJaggedId | undefined;
    Description?: ParagraphsString | undefined;
    Display: OracleCategoryDisplay;
    Usage?: OracleUsage | undefined;
    Oracles?: Oracle[] | undefined;
    Categories?: OracleCategory[] | undefined;
    "Sample Names"?: string[];
    constructor(json: IOracleCategoryYaml, category?: OracleCategoryJaggedId | undefined, ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]);
}
//# sourceMappingURL=OracleCategory.d.ts.map