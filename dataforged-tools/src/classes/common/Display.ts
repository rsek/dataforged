import type { IDisplay } from "@json_out/index.js";
/**
 * @internal
 */
export class Display implements IDisplay {
  Icon?: string | undefined;
  Images?: string[] | undefined;
  Color?: string | undefined;
  constructor({ Icon, Images, Color }: IDisplay) {
    this.Icon = Icon;
    this.Images = Images;
    this.Color = Color;
  }
}