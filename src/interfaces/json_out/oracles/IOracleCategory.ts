import type { IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IOracleBase } from "@dataforged/interfaces/json_out/oracles/IOracleBase.js";
import type { OracleCategoryJaggedId, OracleCategoryName } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";
import type { OracleCategoryId } from "@dataforged/interfaces/json_out/oracles/strings/OracleCategoryId.js";

export interface IOracleCategory extends IOracleBase, IHasName<OracleCategoryName> {
  $id: OracleCategoryId;
  Category?: OracleCategoryJaggedId | undefined;
  Categories?: IOracleCategory[] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
}
