import type { IRow, ITableColumnBase, OracleTableId } from "../index.js";
export interface IResultColumn extends ITableColumnBase {
    Label: string;
    "Use content from": OracleTableId;
    Key: keyof IRow;
}
//# sourceMappingURL=IResultColumn.d.ts.map