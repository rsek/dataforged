import type { SettingTruthId } from "./SettingTruth.js";
import type { ParagraphsString } from "../general/StringTypes.js";
import type RollTemplate from "../oracles/interfaces/IRollTemplate.js";
import type IRow from "../oracles/interfaces/IRow.js";

/**
 * A valid setting truth option ID.
 * @date 4/5/2022 - 1:13:30 AM
 *
 * @export
 * @typedef {SettingTruthOptionId}
 */
export type SettingTruthOptionId = `${SettingTruthId} / ${number}` | `${SettingTruthId} / ${number}-${number}`;

/**
 *
 * @date 4/5/2022 - 1:13:30 AM
 *
 * @export
 * @interface ISettingTruthOption
 * @typedef {ISettingTruthOption}
 * @extends {Omit<IRow, "">}
 */
export default interface ISettingTruthOption extends Omit<IRow, "$id"> {
  /**
   *
   * @date 4/5/2022 - 1:13:30 AM
   *
   * @type {SettingTruthOptionId}
   */
  $id: SettingTruthOptionId;
  /**
   *
   * @date 4/5/2022 - 1:13:30 AM
   *
   * @type {ParagraphsString}
   */
  "Quest Starter": ParagraphsString;
  /**
   *
   * @date 4/5/2022 - 1:13:30 AM
   *
   * @type {ParagraphsString}
   */
  Description: ParagraphsString;

  "Roll template"?: RollTemplate<"Summary"|"Description"> | undefined;
}