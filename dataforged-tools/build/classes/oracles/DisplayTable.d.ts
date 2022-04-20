import { RollColumn, TextColumn } from "../index.js";
import type { IDisplayTable, IOracle } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class DisplayTable implements IDisplayTable {
    "Result columns": TextColumn[];
    "Roll columns": RollColumn[];
    constructor(json: Partial<IDisplayTable>, parentId: IOracle["$id"]);
}
//# sourceMappingURL=DisplayTable.d.ts.map