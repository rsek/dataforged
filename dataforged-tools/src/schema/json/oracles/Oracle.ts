import type { MixinAliases, MixinDescription, MixinDisplay, MixinId, MixinOracleContent, MixinSource, MixinSummary, MixinText, MixinTitle, OracleDisplayBase, OracleSet, OracleTable, OracleTableRow, OracleUsage, Requirements, RowNullStub, TitleCaseTitle } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js';

/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link OracleTable} and {@link OracleSet} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export interface Oracle extends Partial<MixinSummary & MixinDescription & MixinOracleContent & MixinAliases>, MixinId, MixinDisplay, MixinSource, MixinTitle {
  $id: string
  title: TitleCaseTitle;
  /**
   * An array containing the ID of every {@link OracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-/]+$
   */
  ancestors: Array<OracleSet['$id']>
  display: OracleDisplayBase
  /**
   * Information on the usage of this oracle: recommended number of rolls, etc.
   */
  usage?: OracleUsage | undefined
  /**
   * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
   */
  table?: Array<OracleTableRow | RowNullStub> | undefined
  /**
   * Oracle tables contained by this set.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  tables?: { [key: SnakeCaseString]: OracleTable } | undefined
  /**
   * Oracle sets contained by this set.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  sets?: { [key: SnakeCaseString]: OracleSet } | undefined
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a localizable string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   *
   * This key appears only on {@link OracleTable}s that have a `Table`.
   */
  on_a_match?: OracleMatch | undefined
  requires?: Requirements | undefined
}


/**
 * @public
 */
export interface OracleMatch extends MixinId, MixinText {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?/on_a_match$
   */
  $id: string
}
