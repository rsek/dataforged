import type { Display, MixinId, OracleTable, OracleTableRow, TableColumnRoll, TableColumnText } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * Base interface inherited by {@link OracleSetDisplay} and {@link OracleTableDisplay}.
 * @public
 */
export interface OracleDisplayBase extends Display, MixinId {
  /**
   * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
   *
   * If `undefined`, this table is rendered as a standalone table.
   *
   * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
   */
  column_of?: OracleTable['$id'] | undefined
  /**
   * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
   *
   * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
   */
  columns?: {
    [key: SnakeCaseString]: TableColumnRoll | TableColumnText
  } | undefined
  /**
   * This table is displayed as embedded in a row of another table.
   */
  embed_in?: OracleTableRow['$id'] | undefined
}

/**
 * Information on displaying {@link OracleSet}, including information on its rendering in the original text.
 *
 * If an {@link OracleSet} has `Columns`, it represents a "supertable" composed of multiple roll or string columns.
 * @public
 */
export interface OracleSetDisplay extends Omit<OracleDisplayBase, 'column_of' | 'embed_in'> { }

/**
 * Information on displaying {@link OracleTable}, including information on its rendering in the original text.
 * @public
 */
export interface OracleTableDisplay extends OracleDisplayBase {
  columns: { [key: SnakeCaseString]: TableColumnRoll | TableColumnText }
}
