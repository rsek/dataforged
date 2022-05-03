/**
 * Enumerates valid sourcebook titles.
 * @public
 */
export enum SourceTitle {
  Starforged = "Ironsworn: Starforged Rulebook",
  StarforgedAssets = "Ironsworn: Starforged Assets",
  Ironsworn = "Ironsworn Rulebook",
  IronswornAssets = "Ironsworn Assets",
  IronswornDelve = "Ironsworn: Delve",
  IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)"
}

/**
 * Enumerates valid source URLs.
 * @public
 */
export enum SourceUrl {
  IronswornRulebook = "https://shawn-tomkin.itch.io/ironsworn",
  IronswornAssets = "https://shawn-tomkin.itch.io/ironsworn",
  IronswornDelve = "https://shawn-tomkin.itch.io/ironsworn-delve",
  IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view",
}

/**
 * Interface representing data on the game's source.
 * @public
 */
export interface ISource {
  /**
   * The title of the source.
   */
  Title: SourceTitle;
  /**
   * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
   * @pattern ^(0[1-9]|1[0-2])([0-2][1-9]|3[0-1])([0-9][0-9])$
   */
  Date?: string | undefined;
  /**
   * The page on which the item appears most prominently.
   */
  Page?: number | undefined;
  /**
   * The URL where the source is available.
   * @pattern ^https?://.*$
   */
  Url?: string | undefined;
}
