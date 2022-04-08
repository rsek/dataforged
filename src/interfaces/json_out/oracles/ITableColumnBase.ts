import type { OracleTableId } from "@dataforged/interfaces/json_out/index.js";

/**
 * @internal
 */
export interface ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
}

