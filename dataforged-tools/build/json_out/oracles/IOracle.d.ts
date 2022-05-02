import type { IHasName, IOracleBase, IRow, ITableDisplay } from "../index.js";
import type { IOracleCategory } from "../index.js";
/**
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * The distinction between {@link IOracleCategory} and IOracles that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export interface IOracle extends IOracleBase, IHasName {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?$
     */
    $id: string;
    Display: ITableDisplay;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;
}
//# sourceMappingURL=IOracle.d.ts.map