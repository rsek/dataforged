import { ResultColumn, RollColumn } from "../../../dist/classes/oracles/TableColumn.js";
import type { IDisplayTable, OracleTableId } from "@dataforged/json_out/index.js";
export declare class DisplayTable implements IDisplayTable {
    "Result columns": ResultColumn[];
    "Roll columns": RollColumn[];
    constructor(json: Partial<IDisplayTable>, parentId: OracleTableId);
}
//# sourceMappingURL=DisplayTable.d.ts.map