import { DisplayTable } from "../../../dist/classes/oracles/DisplayTable.js";
import type { ImageUrl, ITableDisplay, OracleTableId, Raster, Vector } from "@dataforged/json_out/index.js";
export declare class OracleDisplay implements ITableDisplay {
    Title: string;
    "Column of"?: OracleTableId | undefined;
    Table: DisplayTable;
    Images?: ImageUrl<Raster>[] | undefined;
    Icon?: ImageUrl<Vector> | undefined;
    constructor(json: Partial<ITableDisplay>, parentName: string, parentId: OracleTableId);
}
//# sourceMappingURL=OracleDisplay.d.ts.map