import { TableColumnType } from "../../json_out/index.js";
/**
 * @internal
 */
export class TableColumnText {
    constructor(parentID, content, index, label = "Result", key = "Result") {
        this.Type = TableColumnType.String;
        this.$id = `${parentID}/Columns/${index + 1}`;
        this.Label = label;
        this["Content"] = content;
        this.Key = key;
    }
}
/**
 * @internal
 */
export class TableColumnRoll {
    constructor(parentID, content, index, label = "Roll") {
        this.Type = TableColumnType.Range;
        this.$id = `${parentID}/Columns/${index + 1}`;
        this.Label = label;
        this["Content"] = content;
    }
}
//# sourceMappingURL=TableColumn.js.map