import type { IOracle , IRow, ITableColumnBase, TableColumnType } from "@json_out/index.js";
import type { KeysWithValuesOfType } from "@utils/types/KeysWithValuesOfType.js";

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link ITableColumnRoll}, which displays numerical ranges).
 * @public
 */
export interface ITableColumnText extends ITableColumnBase {
  Type: TableColumnType.String
  /**
   * @default "Result"
   * @localize
   */
  Label: string;
  /**
   * @default "Result"
   */
  Key: KeysWithValuesOfType<IRow, string>
}

export { KeysWithValuesOfType };
