import type { ImageUrl, Raster, Vector } from "@dataforged/json_out/index.js";
export interface IDisplay {
    Title: string;
    Icon?: ImageUrl<Vector> | undefined;
    Images?: ImageUrl<Raster>[] | undefined;
    Color?: string | undefined;
}
//# sourceMappingURL=IDisplay.d.ts.map