import { Display, TableColumnRoll, TableColumnText } from "../index.js";
import type { IOracle, IOracleDisplay as IOracleDisplay } from "../../json_out/index.js";
import type { IOracleDisplayYaml } from "../../yaml_in/oracles/IOracleDisplayYaml.js";
/**
 * @internal
 */
export declare class OracleDisplay extends Display implements IOracleDisplay {
    $id: string;
    "Column of"?: IOracle["$id"] | undefined;
    Columns: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
    constructor(json: IOracleDisplayYaml, parent: IOracle);
}
//# sourceMappingURL=OracleDisplay.d.ts.map