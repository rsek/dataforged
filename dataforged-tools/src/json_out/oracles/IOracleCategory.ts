import type { IHasName, IOracle, IOracleBase } from "@json_out/index.js";

/**
 * Represents an oracle category: a grouping that can contain both Oracles and other Oracle categories, but doesn't have its own `Table` key.
 *
 * The distinction between this and {@link IOracle}s that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export interface IOracleCategory extends IOracleBase, IHasName {
  /**
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
   */
  $id: string,
  Name: string;
  /**
   */
  Category?: IOracleCategory["$id"] | undefined;
  /**
   * Subcategories contained by this oracle category.
   */
  Categories?: IOracleCategory[] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
}
