import { SourceInheritor } from "../index.js";
import { OracleContent } from "../index.js";
import { OracleDisplay } from "../index.js";
import { OracleUsage } from "../index.js";
import { Row } from "../index.js";
import type { IOracle, OracleCategoryId, OracleTableId, ParagraphsString } from "../../json_out/index.js";
import type { IOracleYaml } from "../../yaml_in/index.js";
import type { IOracleCategoryYaml } from "../../yaml_in/oracles/IOracleCategoryYaml.js";
export declare class Oracle extends SourceInheritor implements IOracle {
    $id: OracleTableId;
    "Name": string;
    Aliases?: string[] | undefined;
    "Member of"?: OracleTableId | undefined;
    Category: OracleCategoryId;
    Description?: ParagraphsString | undefined;
    Display: OracleDisplay;
    Usage?: OracleUsage | undefined;
    Content?: OracleContent | undefined;
    Table?: Row[] | undefined;
    Oracles?: Oracle[] | undefined;
    constructor(json: IOracleYaml, category: OracleCategoryId, memberOf?: OracleTableId, ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]);
}
//# sourceMappingURL=Oracle.d.ts.map