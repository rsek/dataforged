import type { ImageUrl, Raster, Vector } from "../index.js";
/**
 * Interface for data relevant to an item's display/rendering.
 *
 * @public
 */
export interface IDisplay {
    /**
     * The title of this item as it appears printed in the rulebook. Intended for use as the item's header, label, etc.
     */
    Title: string;
    /**
   * A URL pointing to a single SVG icon.
   */
    Icon?: ImageUrl<Vector> | undefined;
    /**
     * An array of URLs pointing to one or more WEBP images.
     */
    Images?: ImageUrl<Raster>[] | undefined;
    /**
     * A hex color associated with this item, for use as e.g. an accent color in its display.
     */
    Color?: string | undefined;
}
//# sourceMappingURL=IDisplay.d.ts.map