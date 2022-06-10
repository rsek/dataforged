import type { IDisplayWithTitle, ImageUrl, Raster, Vector } from "@json_out/index.js";

/**
 * @internal
 */
export class OracleCategoryDisplay implements IDisplayWithTitle {
  $id: string;
  Title: string;
  Icon?: string | undefined;
  Images?: string[] | undefined;
  Color?: string | undefined;
  constructor(json: Partial<IDisplayWithTitle>, parentName: string, parentId: string) {
    this.$id = parentId + "/Display";
    this.Title = json.Title ?? parentName;
    this.Icon = json.Icon;
    this.Color = json.Color;
    this.Images = json.Images;
  }
}