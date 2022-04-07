import type OracleTableId from "@dataforged/strings/id/OracleTableId.js";

export default interface ITableColumn {
  Label: string;
  "Use content from": OracleTableId;
}

