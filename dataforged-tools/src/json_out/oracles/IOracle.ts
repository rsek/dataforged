import type { IHasName , IOracleBase, IRow, ITableDisplay } from "@json_out/index.js";
import type { IOracleCategory, OracleCategoryId } from "@json_out/oracles/IOracleCategory.js";

/**
 * @public
 */
type OracleTableId = `${OracleCategoryId}/${string}`; export { OracleTableId };

/**
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * The distinction between {@link IOracleCategory} and IOracles that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export interface IOracle extends IOracleBase, IHasName {
  $id: OracleTableId;
  Display: ITableDisplay;
  Category: IOracleCategory["$id"];
  "Member of"?: IOracle["$id"] | undefined;
  "Table"?: IRow[] | undefined;
}
