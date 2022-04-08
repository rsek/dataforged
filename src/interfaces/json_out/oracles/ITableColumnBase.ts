import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";

/**
 * @internal
 */
export interface ITableColumnBase {
  Label: string;
  "Use content from": OracleTableId;
}

