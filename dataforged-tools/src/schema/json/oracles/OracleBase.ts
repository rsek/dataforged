import type { HasDescription, HasDisplay, HasId, HasOracleContent, HasSource, HasSummary, HasText, HasTitle, OracleDisplayBase, OracleSet, OracleTable, OracleTableRow, OracleUsage, RowNullStub } from "@schema";

/**
 * @public
 */
export interface OracleMatch extends HasId, HasText {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?/on_a_match$
   */
  $id: string
}

/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link OracleTable} and {@link OracleSet} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export interface OracleBase extends Partial< HasSummary & HasDescription & HasOracleContent >, HasId, HasDisplay, HasSource, HasTitle  {
  $id: string;
  /**
   * An array containing the ID of every {@link OracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-/]+$
   */
  Ancestors: OracleSet["$id"][];
  Display: OracleDisplayBase;
  /**
   * Information on the usage of this oracle: recommended number of rolls, etc.
   */
  Usage?: OracleUsage | undefined;
  /**
   * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
   */
  Table?: (OracleTableRow| RowNullStub)[] | undefined;
  /**
   * Oracle tables contained by this set.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Tables?: {[key:string]: OracleTable} | undefined;
  /**
   * Oracle sets contained by this set.
   *
   * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Sets?: {[key:string]: OracleSet} | undefined;
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   *
   * This key appears only on {@link OracleTable}s that have a `Table`.
   */
  "On a match"?: OracleMatch | undefined
}
