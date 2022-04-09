import { SourceInheritor } from "../index.js";
import { Oracle } from "../index.js";
import { OracleCategoryDisplay } from "../index.js";
import { OracleUsage } from "../index.js";
import type { IOracleCategory, OracleCategoryId, OracleCategoryJaggedId, OracleCategoryName, ParagraphsString } from "../../json_out/index.js";
import type { IOracleCategoryYaml, IOracleYaml } from "../../yaml_in/index.js";
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