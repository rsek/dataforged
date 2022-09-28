import type { HasLabel, OracleTable, OracleTableRow } from '@schema'
import type { KeysWithValuesOfType } from '@utils'

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export enum TableColumnType {
  Range = 'dice range',
  String = 'string'
}

/**
 * Interface with elements common to {@link TableColumnRoll} and {@link TableColumnText}.
 * @public
 */
export interface TableColumnBase extends HasLabel {
  /**
   * The label or header text to use for this column.
   * @localize
   */
  Label: string
  /**
   * The ID of the {@link OracleTable} whose {@link OracleTable.Table} content will be displayed in the table.
   */
  'Content': OracleTable['$id']
  'Column type': TableColumnType
  /**
   * The key of each {@link OracleTableRow} in the {@link OracleTable.Table}, whose string value is displayed in the rendered table.
   */
  Key?: KeysWithValuesOfType<OracleTableRow, string> | undefined
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link TableColumnRoll}, which displays numerical ranges).
 * @public
 */
export interface TableColumnText extends TableColumnBase {
  'Column type': TableColumnType.String
  /**
   * @default "Result"
   * @localize
   */
  Label: string
  /**
   * @default "Result"
   */
  Key: KeysWithValuesOfType<OracleTableRow, string>
}

/**
 * @public
 */
export interface TableColumnRoll extends Omit<TableColumnBase, 'Key'> {
  /**
   * @default "Roll"
   * @localize
   */
  Label: string
  'Column type': TableColumnType.Range
}
