import type { IHasName , IOracleBase , OracleCategoryId, OracleCategoryJaggedId , OracleCategoryName } from "@json_out/index.js";

export interface IOracleCategory extends IOracleBase, IHasName<OracleCategoryName> {
  $id: OracleCategoryId;
  Category?: OracleCategoryJaggedId | undefined;
  Categories?: IOracleCategory[] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
}
