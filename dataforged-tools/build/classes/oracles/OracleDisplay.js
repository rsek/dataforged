import { Display, TableColumnRoll, TableColumnText } from "../index.js";
import { TableColumnType } from "../../json_out/index.js";
import { cloneDeep } from "lodash-es";
/**
 * @internal
 */
export class OracleDisplay extends Display {
    constructor(json, parent) {
        super(json);
        this.$id = parent.$id + "/Display";
        this["Column of"] = (json["Column of"]) ?? undefined;
        const defaultColumns = cloneDeep(json.Columns) ?? [{ Type: TableColumnType.Range }, { Type: TableColumnType.String, Key: "Result" }];
        this.Columns = defaultColumns.map((col, index) => {
            switch (col.Type) {
                case TableColumnType.Range:
                    return new TableColumnRoll(this.$id, col["Use content from"] ?? parent.$id, index, col.Label);
                case TableColumnType.String:
                    return new TableColumnText(this.$id, col["Use content from"] ?? parent.$id, index, col.Label, col.Key);
            }
        });
    }
}
//# sourceMappingURL=OracleDisplay.js.map