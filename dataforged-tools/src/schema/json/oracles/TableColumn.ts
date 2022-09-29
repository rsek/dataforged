import type { MixinLabel, OracleTable, OracleTableRow } from '@schema'
import type { KeysWithValuesOfType } from '@utils'

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export enum TableColumnType {
  DiceRange = 'dice_range',
  String = 'string'
}

/**
 * Interface with elements common to {@link TableColumnRoll} and {@link TableColumnText}.
 * @public
 */
export interface TableColumnBase extends MixinLabel {
  /**
   * The label or header text to use for this column.
   * @localize
   */
  label: string
  /**
   * The ID of the {@link OracleTable} whose {@link OracleTable.table} content will be displayed in the table.
   */
  content: OracleTable['$id']
  column_type: TableColumnType
  /**
   * The key of each {@link OracleTableRow} in the {@link OracleTable.table}, whose string value is displayed in the rendered table.
   */
  key?: KeysWithValuesOfType<OracleTableRow, string> | undefined
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link TableColumnRoll}, which displays numerical ranges).
 * @public
 */
export interface TableColumnText extends TableColumnBase {
  column_type: TableColumnType.String
  /**
   * @default "Result"
   * @localize
   */
  label: string
}

/**
 * @public
 */
export interface TableColumnRoll extends Omit<TableColumnBase, 'key'> {
  /**
   * @default "Roll"
   * @localize
   */
  label: string
  column_type: TableColumnType.DiceRange
}
