import { OracleContent, OracleDisplay, OracleUsage, Row, SourceInheritor } from "../index.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { IOracle, OracleCategoryId, OracleTableId } from "../../json_out/index.js";
import type { IOracleYaml } from "../../yaml_in/index.js";
import type { IOracleCategoryYaml } from "../../yaml_in/oracles/IOracleCategoryYaml.js";
/**
 * @internal
 */
export declare class Oracle extends SourceInheritor implements IOracle {
    $id: OracleTableId;
    "Name": string;
    Aliases?: string[] | undefined;
    "Member of"?: IOracle["$id"] | undefined;
    Category: OracleCategoryId;
    Description?: string | undefined;
    Display: OracleDisplay;
    Usage?: OracleUsage | undefined;
    Content?: OracleContent | undefined;
    Table?: Row[] | undefined;
    Oracles?: Oracle[] | undefined;
    constructor(json: IOracleYaml, gamespace: Gamespace, category: OracleCategoryId, memberOf?: IOracle["$id"], ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]);
}
//# sourceMappingURL=Oracle.d.ts.map