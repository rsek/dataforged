import type { IOracle } from "@json_out/index.js";

/**
 * Interface with elements common to {@link IRollColumn} and {@link ITextColumn}.
 * @public
 */
export interface ITableColumnBase {
  /**
   * @localize
   */
  Label: string;
  /**
   * The ID of the oracle table to use.
   */
  "Use content from": IOracle["$id"];
}

