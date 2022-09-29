import type { Oracle, OracleMatch, OracleSet, OracleTableDisplay, Title, Attribute, MixinDisplay, MixinGameObjects, MixinOracleContent, MixinRollTemplate, MixinSuggestions, MixinSummary, MultipleRolls, TruthOptionSubtableRowStarforged } from '@schema'
import { AttributeMap } from '@utils'
import type { Nullable } from '@utils/types/Nullable.js'

/**
 * Represents an oracle that has a `Table` composed of {@link OracleTableRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link Oracle} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface OracleTable extends Omit<Oracle, 'sets' | 'tables'> {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_]+((/[a-z_]+)+)?$
   */
  $id: string
  /**
   * @example
   * ```json
   * {
   *  "canonical": "Spaceborne peril",
   *  "standard": "Spaceborne peril",
   *  "short": "Peril"
   * }
   * ```
   */
  title: Title
  display: OracleTableDisplay
  table: Array<OracleTableRow | RowNullStub>
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   */
  on_a_match?: OracleMatch | undefined
}

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export interface OracleTableRow<Floor extends number | null = number | null, Ceiling extends number | null = number | null> extends Partial<Nullable<MixinSummary &
  MixinRollTemplate &
  MixinSuggestions &
  MixinOracleContent &
  MixinGameObjects &
  MixinDisplay
>> {
  /**
   * The ID of this row.
   * @pattern ^(ironsworn|starforged)/oracles(/[a-z_]+)+/[1-9][0-9]*(-[1-9][0-9]*)?(/subtable/[1-9][0-9]*(-[1-9][0-9]*)?)?$
   */
  $id: string
  /**
   * The low end of the dice range for this row.
   * @minimum 1
   * @maximum 100
   * @nullable
   */
  floor: Floor
  /**
   * The high end of the dice range for this row.
   * @minimum 1
   * @maximum 100
   * @nullable
   */
  ceiling: Ceiling
  /**
   * The primary result text for the row, annotated in Markdown.
   * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   * @markdown
   * @localize
   */
  result: string
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
  summary?: string | null | undefined
  /**
   * Additional oracle tables that should be rolled when this row is selected.
   * @pattern ^(starforged|ironsworn)/oracles/[a-z_]+/[a-z_-/]+$
   */
  oracle_rolls?: Array<OracleTable['$id']> | undefined
  /**
   * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
   */
  multiple_rolls?: MultipleRolls | undefined
  /**
  * The attributes set by this row.
   */
  sets_attributes?: AttributeMap | undefined
}

/**
 * A row stub that has no dice range assigned to it, but still contains user-facing strings that are relevant to rendering the table. Typically, their dice range appears as "--" in the book.
 * @public
 */
export interface RowNullStub extends Omit<Partial<OracleTableRow>, '$id'> {
  floor: null
  ceiling: null
  result: string
  summary?: string | undefined | null
}
