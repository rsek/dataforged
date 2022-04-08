import type { IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { OracleSubcategoryId, OracleTableId } from "@dataforged/interfaces/json_out/index.js";
import type { IOracleBase } from "@dataforged/interfaces/json_out/oracles/IOracleBase.js";
import type { ITableDisplay } from "@dataforged/interfaces/json_out/oracles/IOracleDisplay.js";
import type { IRow } from "@dataforged/interfaces/json_out/oracles/IRow.js";
import type { OracleCategoryId } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";

export interface IOracle extends IOracleBase, IHasName {
  $id: OracleTableId;
  Display: ITableDisplay;
  Category: OracleCategoryId | OracleSubcategoryId;
  "Member of"?: OracleTableId | undefined;
  "Table"?: IRow[] | undefined;
}

