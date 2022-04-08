import type { SourceTitle } from "@dataforged/constants/SourceTitle.js";

/**
 * Interface representing data on the game's source.
 *
 */
export interface ISource {
  /**
   * The title of the source.
   */
  Title: SourceTitle;
  /**
   * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
   */
  Date?: string | undefined;
  /**
   * The page on which the item appears most prominently.
   */
  Page?: number | undefined;
}
