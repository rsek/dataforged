import type { IHasName, IOracle, IOracleBase } from "@json_out/index.js";

/**
 * Represents an oracle category: a grouping that can contain both {@link IOracle}s and other instances of {@link IOracleCategory}, but doesn't have its own `Table` key.
 *
 * If you're looking for a way to crawl the oracle hierarchy in search of a specific ID, see {@link IOracleBase}.
 *
 * @public
 */
export interface IOracleCategory extends IOracleBase {
  /**
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
   */
  $id: string,
  Name: string;
  /**
   */
  Category?: IOracleCategory["$id"] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
  Table?: never;
}
