import { DisplayTable } from "../index.js";
import type { ImageUrl, IOracle, ITableDisplay, Raster, Vector } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class OracleDisplay implements ITableDisplay {
    Title: string;
    "Column of"?: IOracle["$id"] | undefined;
    Table: DisplayTable;
    Images?: ImageUrl<Raster>[] | undefined;
    Icon?: ImageUrl<Vector> | undefined;
    constructor(json: Partial<ITableDisplay>, parentName: string, parentId: IOracle["$id"]);
}
//# sourceMappingURL=OracleDisplay.d.ts.map