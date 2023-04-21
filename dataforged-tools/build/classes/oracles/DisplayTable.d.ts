import { RollColumn, TextColumn } from "../index.js";
import type { IOracle, ITableDisplayInfo as ITableDisplayInfo } from "../../json_out/index.js";
import type { ITableDisplayInfoYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class TableDisplayInfo implements ITableDisplayInfo {
    "Result columns": TextColumn[];
    "Roll columns": RollColumn[];
    constructor(json: ITableDisplayInfoYaml, parentId: IOracle["$id"]);
}
//# sourceMappingURL=DisplayTable.d.ts.map