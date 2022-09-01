import { TableColumnType } from "../../json_out/index.js";
import type { IOracle, ITableColumnRoll, ITableColumnText } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class TableColumnText implements ITableColumnText {
    readonly Type = TableColumnType.String;
    $id: string;
    Label: ITableColumnText["Label"];
    ["Use content from"]: ITableColumnText["Use content from"];
    Key: ITableColumnText["Key"];
    constructor(parentID: string, content: IOracle["$id"], index: number, label?: string, key?: ITableColumnText["Key"]);
}
/**
 * @internal
 */
export declare class TableColumnRoll implements ITableColumnRoll {
    readonly Type = TableColumnType.Range;
    $id: string;
    Label: string;
    ["Use content from"]: ITableColumnRoll["Use content from"];
    constructor(parentID: string, content: IOracle["$id"], index: number, label?: string);
}
//# sourceMappingURL=TableColumn.d.ts.map