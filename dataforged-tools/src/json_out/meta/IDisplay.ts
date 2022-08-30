/**
 * Interface for data relevant to an item's display/rendering.
 * @public
 */
export interface IDisplay {
  /**
   * A URL pointing to a single SVG icon.
   * @pattern ^\.\./\.\./img/vector/[A-z-_0-9/]+\.svg$
   */
  Icon?: string | undefined;
  /**
   * An array of URLs pointing to one or more WEBP images.
   * @pattern ^\.\./\.\./img/raster/[A-z-_0-9/]+\.webp$
   */
  Images?: string[] | undefined;
  /**
   * A hex color associated with this item, for use as e.g. an accent color in its display.
   * @pattern ^#[A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9]$
   */
  Color?: string | undefined;
  /**
   * The title of this item as it appears printed in the rulebook. Intended for use as the item's header, label, etc.
   * @localize
   * @deprecated Use `Title` on the parent object, instead.
   */
  Title?: string | undefined;
}

/**
 * @public
 * @deprecated Use {@link IHasTitle} on the parent object instead.
 */
export interface IDisplayWithTitle extends IDisplay {
  Title: string;
}
