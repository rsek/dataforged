import { Display, TableColumnRoll, TableColumnText } from "../index.js";
import type { IOracleDisplayBase, IOracleSet, IOracleSetDisplay, IOracleTable, IOracleTableDisplay as IOracleTableDisplay, IRow } from "../../json_out/index.js";
import type { IOracleDisplayBaseYaml, IOracleSetDisplayYaml, IOracleTableDisplayYaml } from "../../yaml_in/oracles/IOracleDisplayYaml.js";
/**
 * @internal
 */
export declare abstract class OracleDisplayBase extends Display implements IOracleDisplayBase {
    $id: string;
    "Column of"?: IOracleTable["$id"] | undefined;
    Columns?: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]] | undefined;
    "Embed in"?: IRow["$id"] | undefined;
    buildColumns<DT extends IOracleSetDisplayYaml | IOracleTableDisplayYaml, PT extends IOracleTable | IOracleSet>(json: DT, parent: PT): [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
    constructor(json: IOracleDisplayBaseYaml, parent: IOracleTable | IOracleSet);
}
/**
 * @internal
 */
export declare class OracleTableDisplay extends OracleDisplayBase implements IOracleTableDisplay {
    "Column of"?: IOracleTable["$id"] | undefined;
    Columns: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
    constructor(json: IOracleTableDisplayYaml, parent: IOracleTable);
}
/**
 * @internal
 */
export declare class OracleSetDisplay extends OracleDisplayBase implements IOracleSetDisplay {
    constructor(json: IOracleSetDisplayYaml, parent: IOracleSet);
}
//# sourceMappingURL=OracleDisplay.d.ts.map