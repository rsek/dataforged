import type { SettingTruthId } from "@dataforged/classes/setting_truths/SettingTruth.js";
import type { RollTemplate } from "@dataforged/interfaces/json_out/oracles/IRollTemplate.js";
import type { IRow } from "@dataforged/interfaces/json_out/oracles/IRow.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

/**
 * A valid setting truth option ID.
 *
 */
export type SettingTruthOptionId = `${SettingTruthId} / ${number}` | `${SettingTruthId} / ${number}-${number}`;

/**
 *
 *
 */
export interface ISettingTruthOption extends Omit<IRow, "$id"> {
  /**
   */
  $id: SettingTruthOptionId;
  /**
   */
  "Quest Starter": ParagraphsString;
  /**
   */
  Description: ParagraphsString;

  "Roll template"?: RollTemplate<"Summary"|"Description"> | undefined;
}