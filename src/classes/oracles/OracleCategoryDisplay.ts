import type { IOracleCategoryDisplay } from "@dataforged/interfaces/json_out/oracles/IOracleCategoryDisplay.js";
import type { ImageUrl, Raster, Vector } from "@dataforged/strings/Url.js";

export default class OracleCategoryDisplay implements IOracleCategoryDisplay {
  Title: string;
  Icon?: ImageUrl<Vector> | undefined;
  Images?: ImageUrl<Raster>[] | undefined;
  constructor(json: Partial<IOracleCategoryDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
  }
}