import { DisplayTable } from "../index.js";
import type { IOracle, ITableDisplay } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class TableDisplay implements ITableDisplay {
    Title: string;
    "Column of"?: IOracle["$id"] | undefined;
    Table: DisplayTable;
    Images?: ITableDisplay["Images"];
    Icon?: ITableDisplay["Icon"];
    constructor(json: Partial<ITableDisplay>, parentName: string, parentId: IOracle["$id"]);
}
//# sourceMappingURL=OracleDisplay.d.ts.map