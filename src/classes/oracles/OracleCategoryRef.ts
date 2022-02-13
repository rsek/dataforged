

import { OracleCategory } from "./OracleCategory";
import { OracleCategoryId } from "./OracleId";
import { OracleInfo } from "./OracleInfo";


export class OracleCategoryRef {
  constructor(tableId: OracleCategoryId) {
    this.$id = tableId;
    this.getOracleCategory = this.getOracleCategory.bind(this);
  }
  private $id: OracleCategoryId;
  getOracleCategory(keyedOracleCategories: Record<OracleCategoryId, OracleCategory | OracleInfo>) {
    return keyedOracleCategories[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}
