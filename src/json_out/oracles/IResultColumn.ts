import type { IRow, ITableColumnBase } from "@json_out/index.js";
import type { IOracle } from "@json_out/oracles/IOracle.js";

export interface IResultColumn extends ITableColumnBase {
  Label: string;
  "Use content from": IOracle["$id"];
  Key: keyof IRow;
}
