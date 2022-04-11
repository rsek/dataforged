import type { IDisplay, IDisplayTable } from "../index.js";
import type { IOracle } from "./IOracle.js";
export interface ITableDisplay extends IDisplay {
    Title: string;
    "Column of"?: IOracle["$id"] | undefined;
    Table: IDisplayTable;
}
//# sourceMappingURL=IOracleDisplay.d.ts.map