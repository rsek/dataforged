

import type { ImageUrl, Raster, Vector } from "../../general/Url.js";
import type IOracleCategoryDisplay from "../interfaces/IOracleCategoryDisplay.js";

export default class OracleCategoryDisplay implements IOracleCategoryDisplay {
  Title: string;
  Icon?: ImageUrl<Vector> | undefined;
  Images?: ImageUrl<Raster>[] | undefined;
  constructor(json: Partial<IOracleCategoryDisplay>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Images = json.Images;
  }
}