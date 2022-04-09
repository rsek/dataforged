import type { IDisplay, ImageUrl, Raster, Vector } from "../../json_out/index.js";
export declare class OracleCategoryDisplay implements IDisplay {
    Title: string;
    Icon?: ImageUrl<Vector> | undefined;
    Images?: ImageUrl<Raster>[] | undefined;
    constructor(json: Partial<IDisplay>, parentName: string);
}
//# sourceMappingURL=OracleCategoryDisplay.d.ts.map