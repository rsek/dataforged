import t from 'ts-runtime/lib';

import OracleCategoryInfo from "./OracleCategory";
import OracleCategoryId from "../OracleCategoryId";
import OracleInfo from "./OracleInfo";


export default class OracleCategoryRef {
  constructor(tableId: OracleCategoryId) {
    this.$id = tableId;
    this.getOracleCategory = this.getOracleCategory.bind(this);
  }
  private $id: OracleCategoryId;
  getOracleCategory(keyedOracleCategories: Record<OracleCategoryId, OracleCategoryInfo | OracleInfo>) {
    return keyedOracleCategories[this.$id];
  }
  toString() { return this.$id; }
  toJSON() { return this.$id; }
}
