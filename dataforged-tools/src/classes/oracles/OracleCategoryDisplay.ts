import type { IDisplayWithTitle } from "@json_out/index.js";

/**
 * @internal
 */
export class OracleCategoryDisplay implements IDisplayWithTitle {
  Title: string;
  Icon?: string | undefined;
  Images?: string[] | undefined;
  Color?: string | undefined;
  constructor(json: Partial<IDisplayWithTitle>, parentName: string) {
    this.Title = json.Title ?? parentName;
    this.Icon = json.Icon;
    this.Color = json.Color;
    this.Images = json.Images;
  }
}