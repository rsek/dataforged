// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IOracle, IOracleBase } from "@json_out/index.js";

/**
 * Represents an oracle category: a grouping that can contain both {@link IOracle}s and other instances of {@link IOracleCategory}, but doesn't have its own `Table` key.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracle} and {@link IOracleCategory} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface IOracleCategory extends Omit<IOracleBase, "Table"> {
  /**
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
   */
  $id: string,
  Category?: IOracleCategory["$id"] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
  Categories?:  IOracleCategory[] | undefined;
  Oracles?: IOracle[] | undefined;
}
