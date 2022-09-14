import type { IOracleBase , IOracleMatch, IOracleSet , IOracleTableDisplay, IRow, IRowNullStub, ITitle } from "@json_out/index.js";

/**
 * Represents an oracle that has a `Table` composed of {@link IRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracleTable} and {@link IOracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface IOracleTable extends Omit<IOracleBase, "Sets"|"Tables"> {
  /**
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?$
   */
  $id: string;
  /**
   * @example
   * ```typescript
   * {
   *  Canonical: "Character Revealed Aspect",
   *  Short: "Revealed Aspect"
   * }
   * ```
   * @example
   * ```typescript
   * {
   *  Canonical: "Spaceborne Peril",
   *  Short: "Peril"
   * }
   * ```
   */
  Title: ITitle;
  Display: IOracleTableDisplay;
  "Table": (IRow| IRowNullStub)[];
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   */
  "On a Match"?: IOracleMatch | undefined
}

