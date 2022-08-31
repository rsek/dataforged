import { TableDisplayInfo } from "../index.js";
import type { IDisplayOracle as IDisplayOracle, IOracle } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class DisplayOracle implements IDisplayOracle {
    "Column of"?: IOracle["$id"] | undefined;
    Table: TableDisplayInfo;
    Images?: IDisplayOracle["Images"];
    Icon?: IDisplayOracle["Icon"];
    constructor(json: Partial<IDisplayOracle>, parentId: IOracle["$id"]);
}
//# sourceMappingURL=OracleDisplay.d.ts.map