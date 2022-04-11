import type { IDisplay, IDisplayTable } from "@json_out/index.js";
import type { IOracle } from "@json_out/oracles/IOracle.js";

export interface ITableDisplay extends IDisplay {
  Title: string;
  "Column of"?: IOracle["$id"] | undefined;
  Table: IDisplayTable;
}
