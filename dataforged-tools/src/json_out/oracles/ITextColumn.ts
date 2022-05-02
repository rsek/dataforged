import type { IOracle, IRow , ITableColumnBase } from "@json_out/index.js";
import type { KeysWithValuesOfType } from "@utils/types/KeysWithValuesOfType.js";

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link IRollColumn}, which displays numerical ranges).
 * @public
 */
export interface ITextColumn extends ITableColumnBase {
  /**
   * The label or header text to use for this column.
   */
  Label: string;
  /**
   * The ID of the oracle with a `Table` key.
   */
  "Use content from": IOracle["$id"];
  /**
   * The key of each `Row` in the `Table`, whose string value is displayed in the rendered table.
   */
  Key: KeysWithValuesOfType<IRow, string>;
}

export { KeysWithValuesOfType };
