import type { ImageUrl, Raster, Vector } from "./Url.js";

/**
 * Interface for data relevant to an item's display/rendering.
 * @date 4/4/2022 - 11:33:08 PM
 *
 * @export
 * @interface IDisplay
 * @typedef {IDisplay}
 */
export default interface IDisplay {
  /**
   * The title of this item as it appears printed in the rulebook. Intended for use as the item's header, label, etc.
   * @date 4/4/2022 - 11:31:33 PM
   *
   * @type {string}
   */
  Title: string;
    /**
   * A URL pointing to a single SVG icon.
   * @date 4/4/2022 - 11:12:09 PM
   *
   * @type {?(ImageUrl<Vector> | undefined)}
   */
  Icon?: ImageUrl<Vector> | undefined;
  /**
   * An array of URLs pointing to one or more WEBP images.
   * @date 4/4/2022 - 11:12:09 PM
   *
   * @type {?(ImageUrl<Raster>[] | undefined)}
   */
  Images?: ImageUrl<Raster>[] | undefined;
  /**
   * A hex colour associated with this item, for use as e.g. an accent colour in its display.
   * @date 4/4/2022 - 11:29:05 PM
   *
   * @type {?(string | undefined)}
   */
  Color?: string | undefined;
}
