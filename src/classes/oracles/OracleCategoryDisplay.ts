import type { IDisplay, ImageUrl, Raster, Vector } from "@dataforged/json_out/index.js";

export class OracleCategoryDisplay implements IDisplay {
  Title: string;
  Icon?: ImageUrl<Vector> | undefined;
  Images?: ImageUrl<Raster>[] | undefined;
  constructor(json: Partial<IDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
  }
}