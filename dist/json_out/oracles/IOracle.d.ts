import type { IHasName, IOracleBase, IRow, ITableDisplay, OracleTableId } from "../index.js";
import type { IOracleCategory } from "./IOracleCategory.js";
export interface IOracle extends IOracleBase, IHasName {
    $id: OracleTableId;
    Display: ITableDisplay;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;
}
//# sourceMappingURL=IOracle.d.ts.map