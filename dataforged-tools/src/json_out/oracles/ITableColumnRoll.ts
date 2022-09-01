import type { ITableColumnBase, TableColumnType } from "@json_out/index.js";

/**
 * @public
 */
export interface ITableColumnRoll extends Omit<ITableColumnBase,"Key"> {
  /**
   * @default "Roll"
   * @localize
   */
  Label: string;
  Type: TableColumnType.Range
}