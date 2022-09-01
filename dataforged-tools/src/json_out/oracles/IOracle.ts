import type { IOracleDisplay , IOracleBase, IOracleCategory , IOracleMatch, IRow, IRowNullStub, ITitle } from "@json_out/index.js";

/**
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracle} and {@link IOracleCategory} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface IOracle extends Omit<IOracleBase, "Categories"> {
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
  Display: IOracleDisplay;
  Category: IOracleCategory["$id"];
  "Member of"?: IOracle["$id"] | undefined;
  "Table"?: (IRow| IRowNullStub)[] | undefined;
  /**
   * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
   */
  "On a Match"?: IOracleMatch | undefined
}

