import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import { OracleContent } from "../../../dist/classes/oracles/OracleContent.js";
import { OracleDisplay } from "../../../dist/classes/oracles/OracleDisplay.js";
import { OracleUsage } from "../../../dist/classes/oracles/OracleUsage.js";
import { Row } from "../../../dist/classes/oracles/Row.js";
import type { IOracle, OracleCategoryId, OracleTableId, ParagraphsString } from "@dataforged/json_out/index.js";
import type { IOracleYaml } from "@dataforged/yaml_in/index.js";
import type { IOracleCategoryYaml } from "../../../dist/yaml_in/oracles/IOracleCategoryYaml.js";
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