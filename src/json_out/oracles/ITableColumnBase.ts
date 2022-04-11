import type { IOracle } from "@json_out/index.js";

export interface ITableColumnBase {
  Label: string;
  /**
   * The ID of the oracle table to use.
   */
  "Use content from": IOracle["$id"];
}

