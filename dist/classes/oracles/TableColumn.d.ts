import type { IOracle, IResultColumn, IRow, ITableColumnBase } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class ResultColumn implements IResultColumn {
    Label: IResultColumn["Label"];
    ["Use content from"]: IResultColumn["Use content from"];
    Key: IResultColumn["Key"];
    constructor(content: IOracle["$id"], label?: string, key?: keyof IRow);
}
/**
 * @internal
 */
export declare class RollColumn implements ITableColumnBase {
    Label: string;
    ["Use content from"]: IOracle["$id"];
    constructor(content: IOracle["$id"], label?: string);
}
//# sourceMappingURL=TableColumn.d.ts.map