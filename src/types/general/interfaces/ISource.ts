import type SourceTitle from "../SourceTitle.js";


/**
 * Interface representing data on the game's source.
 * @date 4/4/2022 - 10:33:05 PM
 *
 * @export
 * @interface ISource
 * @typedef {ISource}
 */
export default interface ISource {
  /**
   * The title of the source.
   * @date 4/4/2022 - 10:33:05 PM
   *
   * @type {SourceTitle}
   */
  Title: SourceTitle;
  /**
   * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
   * @date 4/4/2022 - 10:33:05 PM
   * @type {?(string | undefined)}
   */
  Date?: string | undefined;
  /**
   * The page on which the item appears most prominently.
   * @date 4/4/2022 - 10:33:05 PM
   *
   * @type {?(number | undefined)}
   */
  Page?: number | undefined;
}
