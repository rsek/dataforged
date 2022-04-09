import type { IResultColumn, IRow, ITableColumnBase, OracleTableId } from "@dataforged/json_out/index.js";
export declare class ResultColumn implements IResultColumn {
    Label: IResultColumn["Label"];
    ["Use content from"]: IResultColumn["Use content from"];
    Key: IResultColumn["Key"];
    constructor(content: OracleTableId, label?: string, key?: keyof IRow);
}
export declare class RollColumn implements ITableColumnBase {
    Label: string;
    ["Use content from"]: OracleTableId;
    constructor(content: OracleTableId, label?: string);
}
//# sourceMappingURL=TableColumn.d.ts.map