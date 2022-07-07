import type { ITableColumnBase, ITextColumn } from "@json_out/index.js";

/**
 * Provides information on how a specific oracle table is rendered in the source text.
 * @public
 */
export interface ITableDisplayInfo {
  "Result columns": ITextColumn[];
  "Roll columns": ITableColumnBase[];
}
