// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IOracleBase, IOracleTable } from "@json_out/index.js";
import type { IOracleSetDisplay } from "@json_out/oracles/IOracleDisplay.js";

/**
 * Represents an oracle set: a grouping that can contain both {@link IOracleTable}s and other instances of {@link IOracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracleTable} and {@link IOracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface IOracleSet extends Omit<IOracleBase, "Table"> {
  /**
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
   */
  $id: string,
  /**
   * A list of sample names for this category. Only used by Planetary Class {@link IOracleSet}s.
   */
  "Sample Names"?: string[] | undefined;
  Sets?: IOracleSet[] | undefined;
  Tables?: IOracleTable[] | undefined;
  Display: IOracleSetDisplay;
}
