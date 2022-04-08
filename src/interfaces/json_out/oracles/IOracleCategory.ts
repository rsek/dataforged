import type { IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IOracle } from "@dataforged/interfaces/json_out/oracles/IOracle.js";
import type { IOracleBase } from "@dataforged/interfaces/json_out/oracles/IOracleBase.js";
import type { IOracleCategoryDisplay } from "@dataforged/interfaces/json_out/oracles/IOracleCategoryDisplay.js";
import type { OracleCategoryJaggedId, OracleCategoryName } from "@dataforged/strings/id/OracleCategoryId.js";
import type { OracleCategoryId } from "@dataforged/strings/id/OracleCategoryId.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export interface IOracleCategory extends IOracleBase, IHasName<OracleCategoryName> {
  $id: OracleCategoryId;
  Category?: OracleCategoryJaggedId | undefined;
  Description?: ParagraphsString | undefined;
  Display: IOracleCategoryDisplay;
  Oracles?: IOracle[] | undefined;
  Categories?: IOracleCategory[] | undefined;
  "Sample Names"?: string[] | undefined;
}
