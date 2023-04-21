import { DisplayOracle, OracleContent, OracleUsage, Row, SourceInheritor } from "../index.js";
import type { Gamespace, IOracle, IOracleCategory } from "../../json_out/index.js";
import type { IOracleYaml } from "../../yaml_in/index.js";
import type { IOracleCategoryYaml } from "../../yaml_in/oracles/IOracleCategoryYaml.js";
/**
 * @internal
 */
export declare class Oracle extends SourceInheritor implements IOracle {
    $id: IOracle["$id"];
    "Name": string;
    Aliases?: string[] | undefined;
    "Member of"?: IOracle["$id"] | undefined;
    Category: IOracleCategory["$id"];
    Description?: string | undefined;
    Display: DisplayOracle;
    Usage?: OracleUsage | undefined;
    Content?: OracleContent | undefined;
    Table?: Row[] | undefined;
    Oracles?: Oracle[] | undefined;
    constructor(json: IOracleYaml, gamespace: Gamespace, category: IOracleCategory["$id"], memberOf?: IOracle["$id"], ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]);
}
//# sourceMappingURL=Oracle.d.ts.map