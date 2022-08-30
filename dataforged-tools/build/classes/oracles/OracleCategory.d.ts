import { Oracle, OracleCategoryDisplay, OracleUsage, SourceInheritor, Title } from "../index.js";
import type { Gamespace, IOracleCategory } from "../../json_out/index.js";
import type { IOracleCategoryYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class OracleCategory extends SourceInheritor implements IOracleCategory {
    $id: IOracleCategory["$id"];
    Name: string;
    Title: Title;
    Aliases?: string[] | undefined;
    Category?: IOracleCategory["$id"] | undefined;
    Description?: string | undefined;
    Display: OracleCategoryDisplay;
    Usage?: OracleUsage | undefined;
    Oracles?: Oracle[] | undefined;
    Categories?: OracleCategory[] | undefined;
    "Sample Names"?: string[];
    constructor(json: IOracleCategoryYaml, gamespace: Gamespace, category?: IOracleCategory["$id"] | undefined, ...ancestorsJson: (IOracleCategoryYaml)[]);
}
//# sourceMappingURL=OracleCategory.d.ts.map