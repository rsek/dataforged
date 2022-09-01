import type { IHasLabel, IOracle, IRow, KeysWithValuesOfType } from "@json_out/index.js";

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export enum TableColumnType {
  Range="dice range",
  String="string"
}

/**
 * Interface with elements common to {@link ITableColumnRoll} and {@link ITableColumnText}.
 * @public
 */
export interface ITableColumnBase extends IHasLabel{
  /**
   * The label or header text to use for this column.
   * @localize
   */
  Label: string;
  /**
   * The ID of the {@link IOracle} whose {@link IOracle.Table} content will be displayed in the table.
   */
  "Content": IOracle["$id"];
  Type: TableColumnType
  /**
   * The key of each {@link IRow} in the {@link IOracle.Table}, whose string value is displayed in the rendered table.
   */
  Key?: KeysWithValuesOfType<IRow, string> | undefined
}

