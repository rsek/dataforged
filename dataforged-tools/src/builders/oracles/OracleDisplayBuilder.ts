import { DisplayBuilder, TableColumnRollBuilder, TableColumnTextBuilder  } from "@builders";
import { TableColumnType } from "@schema_json";
import type { OracleDisplayBase, OracleSet, OracleSetDisplay, OracleTable , OracleTableDisplay as OracleTableDisplay, OracleTableRow , TableColumnRoll, TableColumnText } from "@schema_json";
import type { YamlOracleDisplayBase, YamlOracleSetDisplay, YamlOracleTableDisplay, YamlTableColumnRoll, YamlTableColumnText } from "@schema_yaml";
import { cloneDeep } from "lodash-es";

/**
 * @internal
 */
export abstract class OracleDisplayBuilder extends DisplayBuilder implements OracleDisplayBase {
  $id: string;
  "Column of"?: OracleTable["$id"] | undefined;
  Columns?: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]] | undefined;
  "Embed in"?: OracleTableRow["$id"] | undefined;
  buildColumns<DT extends YamlOracleSetDisplay|YamlOracleTableDisplay,PT extends OracleTable|OracleSet>(json: DT, parent: PT) {
    const defaultColumns: (YamlTableColumnText | YamlTableColumnRoll)[] = cloneDeep(json.Columns) ?? [{ Type: TableColumnType.Range }, { Type: TableColumnType.String, Key: "Result" }];
    const columns = defaultColumns.map((col, index) => {
      if (index === 0 && col.Type !== TableColumnType.Range) {
        throw new Error(`${parent.$id} doesn't have a roll column as its first column: ${JSON.stringify(defaultColumns)}`);
      }
      switch (col.Type) {
        case TableColumnType.Range:
          return new TableColumnRollBuilder(this.$id, col["Content"] ?? parent.$id, index, col.Label);
        case TableColumnType.String:
          return new TableColumnTextBuilder(this.$id, col["Content"] ?? parent.$id, index, col.Label, col.Key);
      }
    });
    if (columns.length !== new Set(columns.map(col => col.Label)).size) {
      throw new Error(`${parent.$id}'s column labels aren't unique ${JSON.stringify(columns)}`);
    }
    return columns as [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
  }
  constructor(json: YamlOracleDisplayBase, parent: OracleTable|OracleSet) {
    super(json);
    this.$id = parent.$id + "/Display";
    this["Column of"] = json["Column of"];
    this["Embed in"] = json["Embed in"];
  }
}

/**
 * @internal
 */
export class OracleTableDisplayBuilder extends OracleDisplayBuilder implements OracleTableDisplay {
  "Column of"?: OracleTable["$id"] | undefined;
  Columns: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
  constructor(json: YamlOracleTableDisplay, parent: OracleTable) {
    super(json, parent);
    this.Columns = this.buildColumns(json, parent);
  }
}

/**
 * @internal
 */
export class OracleSetDisplayBuilder extends OracleDisplayBuilder implements OracleSetDisplay {
  constructor(json: YamlOracleSetDisplay, parent: OracleSet) {
    super(json, parent);
    if (json.Columns) {
      this.Columns = this.buildColumns(json, parent);
    }
  }
}