//License: MIT
export enum SourceTitle {
  Starforged = "Ironsworn: Starforged Rulebook",
  StarforgedAssets = "Ironsworn: Starforged Assets",
  SunderedIslesPreview = "Sundered Isles Preview",
  Ironsworn = "Ironsworn Rulebook",
  IronswornAssets = "Ironsworn Assets",
  IronswornDelve = "Ironsworn: Delve",
  IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)",
  Custom = "Custom"
}

/**
 * Enumerates valid source URLs.
 * @public
 */
export enum SourceUrl {
  Starforged = "https://getstarforged.com",
  StarforgedAssets = "https://getstarforged.com",
  Ironsworn = "https://shawn-tomkin.itch.io/ironsworn",
  IronswornAssets = "https://shawn-tomkin.itch.io/ironsworn",
  IronswornDelve = "https://shawn-tomkin.itch.io/ironsworn-delve",
  IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view",
}

/**
 * Interface representing data on this item's source. For 'canonical' content, this is usually a book with numbered pages, but it might also be a link to a web site.
 * @public
 */
export interface ISource {
  /**
   * The title of the source.
   *
   * For 'canonical' content, use one of the enumerated `SourceTitle` strings.
   *
   * For 3rd-party content (including homebrew) that's been released as part of a titled document, use the title of that document (e.g. "Steelforged", "Ironsmith").
   *
   * If the source has no particular title (for instance, it's a single custom element in a VTT implementation), use "Custom".
   */
  Title: SourceTitle | string;
  /**
   * The author(s) of this item. For 'canonical' content, this one's usually pretty obvious 😉 However, it's included so that homebrew content can use the same interface/schema.
   * @default ["Shawn Tomkin"]
  */
  Authors: string[];
  /**
   * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
   * @pattern ^(0[1-9]|1[0-2])([0-2][1-9]|3[0-1])([0-9][0-9])$
   */
  Date?: string | undefined;
  /**
   * The page on which the item appears most prominently in the source material (if it's in a format that uses page numbers).
   */
  Page?: number | undefined;
  /**
   * The URL where the source material is available.
   * @pattern ^https?://.*$
   */
  Url?: string | undefined;
}
