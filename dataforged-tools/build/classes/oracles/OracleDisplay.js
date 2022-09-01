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
            if (index === 0 && col.Type !== TableColumnType.Range) {
                throw new Error(`${parent.$id} doesn't have a roll column as its first column: ${JSON.stringify(defaultColumns)}`);
            }
            switch (col.Type) {
                case TableColumnType.Range:
                    return new TableColumnRoll(this.$id, col["Content"] ?? parent.$id, index, col.Label);
                case TableColumnType.String:
                    return new TableColumnText(this.$id, col["Content"] ?? parent.$id, index, col.Label, col.Key);
            }
        });
        if (this.Columns.length !== new Set(this.Columns.map(col => col.Label)).size) {
            throw new Error(`${parent.$id}'s column labels aren't unique ${JSON.stringify(this.Columns)}`);
        }
    }
}
//# sourceMappingURL=OracleDisplay.js.map