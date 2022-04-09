import type { IHasName , IOracleBase, IRow , ITableDisplay , OracleCategoryId , OracleSubcategoryId , OracleTableId } from "@json_out/index.js";

export interface IOracle extends IOracleBase, IHasName {
  $id: OracleTableId;
  Display: ITableDisplay;
  Category: OracleCategoryId | OracleSubcategoryId;
  "Member of"?: OracleTableId | undefined;
  "Table"?: IRow[] | undefined;
}

