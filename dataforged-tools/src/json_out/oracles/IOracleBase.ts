//License: MIT
import type { IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasOracleContent, IHasSource, IOracle, IOracleCategory , IOracleUsage, IRow } from "@json_out/index.js";

/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link IOracle} and {@link IOracleCategory} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export interface IOracleBase extends Partial<
    IHasAliases &
    IHasDescription &
    IHasOracleContent
  >, IHasId, IHasDisplay,
  IHasSource, IHasName  {
  /**
   * The ID of the most recent OracleCategory ancestor of this item, if any.
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-/]+$
   */
  Category?: IOracleCategory["$id"] | undefined;
  /**
   * The ID of the most recent Oracle ancestor of this item, if any.
   * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+/[A-z_-]+$
   */
  "Member of"?: IOracle["$id"] | undefined;
  Display: IDisplayWithTitle;
  /**
   * Information on the usage of this oracle: recommended number of rolls, etc.
   */
  Usage?: IOracleUsage | undefined;
  /**
   * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
   *
   * This key appears only on 'leaf' nodes of the oracle hierarchy 'tree' - in other words, many (but not all) {@link IOracle} objects.
   */
  Table?: IRow[] | undefined;
  /**
   * Oracle objects contained by this object.
   *
   * This key appears only on 'branch' nodes of the oracle hierarchy 'tree': {@link IOracleCategory}, and {@link IOracle} (when it contains multiple closely-related tables).
   */
  Oracles?: IOracle[] | undefined;
  /**
   * Subcategories contained by this oracle category.
   *
   * This key appears only on {@link IOracleCategory}, and thus only on 'branch' nodes of the oracle hierarchy 'tree.
   */
  Categories?: IOracleCategory[] | undefined;
}
