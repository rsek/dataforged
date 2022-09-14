import { Display , TableColumnRoll , TableColumnText } from "@classes/index.js";
import { TableColumnType } from "@json_out/index.js";
import type { IOracleDisplayBase, IOracleSet, IOracleSetDisplay, IOracleTable , IOracleTableDisplay as IOracleTableDisplay  , IRow } from "@json_out/index.js";
import type { IOracleDisplayBaseYaml, IOracleSetDisplayYaml, IOracleTableDisplayYaml, ITableColumnRollYaml, ITableColumnTextYaml } from "@yaml_in/oracles/IOracleDisplayYaml.js";
import { cloneDeep } from "lodash-es";

/**
 * @internal
 */
export abstract class OracleDisplayBase extends Display implements IOracleDisplayBase {
  $id: string;
  "Column of"?: IOracleTable["$id"] | undefined;
  Columns?: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]] | undefined;
  "Embed in"?: IRow["$id"] | undefined;
  buildColumns<DT extends IOracleSetDisplayYaml|IOracleTableDisplayYaml,PT extends IOracleTable|IOracleSet>(json: DT, parent: PT) {
    const defaultColumns: (ITableColumnTextYaml | ITableColumnRollYaml)[] = cloneDeep(json.Columns) ?? [{ Type: TableColumnType.Range }, { Type: TableColumnType.String, Key: "Result" }];
    const columns = defaultColumns.map((col, index) => {
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
    if (columns.length !== new Set(columns.map(col => col.Label)).size) {
      throw new Error(`${parent.$id}'s column labels aren't unique ${JSON.stringify(columns)}`);
    }
    return columns as [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
  }
  constructor(json: IOracleDisplayBaseYaml, parent: IOracleTable|IOracleSet) {
    super(json);
    this.$id = parent.$id + "/Display";
    this["Column of"] = json["Column of"];
    this["Embed in"] = json["Embed in"];
  }
}

/**
 * @internal
 */
export class OracleTableDisplay extends OracleDisplayBase implements IOracleTableDisplay {
  "Column of"?: IOracleTable["$id"] | undefined;
  Columns: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
  constructor(json: IOracleTableDisplayYaml, parent: IOracleTable) {
    super(json, parent);
    this.Columns = this.buildColumns(json, parent);
  }
}

/**
 * @internal
 */
export class OracleSetDisplay extends OracleDisplayBase implements IOracleSetDisplay {
  constructor(json: IOracleSetDisplayYaml, parent: IOracleSet) {
    super(json, parent);
    if (json.Columns) {
      this.Columns = this.buildColumns(json, parent);
    }
  }
}