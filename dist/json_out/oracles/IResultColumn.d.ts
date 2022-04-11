import type { IRow, ITableColumnBase } from "../index.js";
import type { IOracle } from "./IOracle.js";
export interface IResultColumn extends ITableColumnBase {
    Label: string;
    "Use content from": IOracle["$id"];
    Key: keyof IRow;
}
//# sourceMappingURL=IResultColumn.d.ts.map