import type { IHasName , IOracleBase, IRow, ITableDisplay , OracleTableId } from "@json_out/index.js";
import type { IOracleCategory } from "@json_out/oracles/IOracleCategory.js";

export interface IOracle extends IOracleBase, IHasName {
  $id: OracleTableId;
  Display: ITableDisplay;
  Category: IOracleCategory["$id"];
  "Member of"?: IOracle["$id"] | undefined;
  "Table"?: IRow[] | undefined;
}

