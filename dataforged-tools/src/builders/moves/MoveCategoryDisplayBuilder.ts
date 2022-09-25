import type { Display } from "@schema";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { validateColor } from "@utils/validation/validateColor.js";

/**
 * @internal
 * @deprecated Will be replaced with a class for displays that include a colour reference
 */
export class MoveCategoryDisplayBuilder implements Display {
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
