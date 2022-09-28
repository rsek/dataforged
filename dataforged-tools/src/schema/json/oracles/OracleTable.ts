import type { OracleBase, OracleMatch, OracleSet, OracleTableDisplay, Title, Attribute, HasDisplay, HasGameObjects, HasOracleContent, HasRollTemplate, HasSuggestions, HasSummary, MultipleRolls, TruthOptionSubtableRowStarforged } from '@schema'
import type { Nullable } from '@utils/types/Nullable.js'


/**
 * Represents an oracle that has a `Table` composed of {@link OracleTableRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link OracleBase} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface OracleTable extends Omit<OracleBase, 'Sets' | 'Tables'> {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?$
   */
  $id: string
  /**
   * @example
   * ```json
   * {
   *  "Canonical": "Character Revealed Aspect",
   *  "Short": "Revealed Aspect"
   * }
   * ```
   * @example
   * ```json
   * {
   *  "Canonical": "Spaceborne Peril",
   *  "Short": "Peril"
   * }
   * ```
   */
  Title: Title
  Display: OracleTableDisplay
  'Table': Array<OracleTableRow | RowNullStub>
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   */
  'On a match'?: OracleMatch | undefined
}

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export interface OracleTableRow extends Partial<Nullable<HasSummary &
  HasRollTemplate &
  HasSuggestions &
  HasOracleContent &
  HasGameObjects &
  HasDisplay
>> {
  /**
   * The ID of this row.
   * @pattern ^(ironsworn|starforged)/oracles(/[a-z_-]+)+/[1-9][0-9]*(-[1-9][0-9]*)?(/subtable/[1-9][0-9]*(-[1-9][0-9]*)?)?$
   */
  $id: string
  /**
   * The low end of the dice range for this row.
   * @minimum 1
   * @maximum 100
   * @nullable
   */
  Floor: number | null
  /**
   * The high end of the dice range for this row.
   * @minimum 1
   * @maximum 100
   * @nullable
   */
  Ceiling: number | null
  /**
   * The primary result text for the row, annotated in Markdown.
   * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   * @markdown
   * @localize
   */
  Result: string
  /**
   * A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).
   *
   * Generally, `Summary` is longer than `Result`.
   *
   * Some tables label this column as something other than `Result`; see the parent (or grandparent) `Oracle.Display.Table` for more information.
   *
   * `null` is used in cases where an 'empty' `Summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT table roll output), however, `null` values can be safely omitted.
   * @nullable
   * @markdown
   * @localize
   */
  Summary?: string | null | undefined
  /**
   * Additional oracle tables that should be rolled when this row is selected.
   * @pattern ^(starforged|ironsworn)/oracles/[a-z_-]+/[a-z_-/]+$
   */
  'Oracle rolls'?: Array<OracleTable['$id']> | undefined
  /**
   * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
   */
  Subtable?: OracleTableRow[] | TruthOptionSubtableRowStarforged[] | undefined
  /**
   * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
   */
  'Multiple rolls'?: MultipleRolls | undefined
  /**
  * The attributes set by this row.
   */
  Attributes?: Attribute[] | undefined
}

/**
 * A row stub that has no dice range assigned to it, but still contains user-facing strings that are relevant to rendering the table. Typically, their dice range appears as "--" in the book.
 * @public
 */
export interface RowNullStub extends Omit<Partial<OracleTableRow>, '$id'> {
  Floor: null
  Ceiling: null
  Result: string
  Summary?: string | undefined | null
}
