import { ResultColumn, RollColumn } from "../index.js";
import type { IDisplayTable, OracleTableId } from "../../json_out/index.js";
export declare class DisplayTable implements IDisplayTable {
    "Result columns": ResultColumn[];
    "Roll columns": RollColumn[];
    constructor(json: Partial<IDisplayTable>, parentId: OracleTableId);
}
//# sourceMappingURL=DisplayTable.d.ts.map