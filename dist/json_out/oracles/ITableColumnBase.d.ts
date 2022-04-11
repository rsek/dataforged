import type { IOracle } from "../index.js";
export interface ITableColumnBase {
    Label: string;
    /**
     * The ID of the oracle table to use.
     */
    "Use content from": IOracle["$id"];
}
//# sourceMappingURL=ITableColumnBase.d.ts.map