//License: MIT
import type { IDisplayWithTitle } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { validateColor } from "@utils/validateColor.js";

/**
 * @internal
 */
export class MoveCategoryDisplay implements IDisplayWithTitle {
  Title: string;
  Color?: string | undefined;
  constructor(title: string, color?: string|undefined) {
    this.Title = title;
    if (color && !validateColor(color)) {
      throw badJsonError(this.constructor, color, "Not a valid color.");
    }
    this.Color = color ?? undefined;
  }
}
