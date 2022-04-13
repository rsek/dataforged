import type { IDisplay, MoveCategoryTitle } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { validateColor } from "@utils/validateColor.js";

/**
 * @internal
 */

export class MoveCategoryDisplay implements IDisplay {
  Title: MoveCategoryTitle;
  Color: string;
  constructor(title: MoveCategoryTitle, color: string) {
    this.Title = title;
    if (!validateColor(color)) {
      throw badJsonError(this.constructor, color, "Not a valid color.");
    }
    this.Color = color;
  }
}
