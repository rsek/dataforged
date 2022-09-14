import type { IDisplay, IHasId, IOracleTable , IRow, ITableColumnRoll, ITableColumnText } from "@json_out/index.js";

/**
 * Base interface inherited by {@link IOracleSetDisplay} and {@link IOracleTableDisplay}.
 * @public
 */
export interface IOracleDisplayBase extends IDisplay, IHasId {
  /**
   * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
   *
   * If `undefined`, this table is rendered as a standalone table.
   *
   * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
   */
  "Column of"?: IOracleTable["$id"] | undefined;
  /**
   * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
   *
   * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
   */
  "Columns"?: [ITableColumnRoll, ...(ITableColumnRoll | ITableColumnText)[]] | undefined;
  /**
   * This table is displayed as embedded in a row of another table.
   */
  "Embed in"?: IRow["$id"] | undefined;
}

/**
 * Information on displaying {@link IOracleSet}, including information on its rendering in the original text.
 *
 * If an {@link IOracleSet} has `Columns`, it represents a "supertable" composed of multiple roll or string columns.
 * @public
 */
export interface IOracleSetDisplay extends Omit<IOracleDisplayBase, "Column of"|"Embed in"> { }

/**
 * Information on displaying {@link IOracleTable}, including information on its rendering in the original text.
 * @public
 */
export interface IOracleTableDisplay extends IOracleDisplayBase {
  "Columns": [ITableColumnRoll, ...(ITableColumnRoll | ITableColumnText)[]];
}
