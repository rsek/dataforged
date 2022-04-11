import type { IHasName, IOracleBase, OracleCategoryName } from "@json_out/index.js";
import type { OracleCategoryId } from "@json_out/oracles/OracleCategoryId.js";

export interface IOracleCategory extends IOracleBase, IHasName {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Category?: IOracleCategory["$id"] | undefined;
  Categories?: IOracleCategory[] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
}
