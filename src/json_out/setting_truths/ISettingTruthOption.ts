import type { IHasDescription, IHasQuestStarter , IRow , RollTemplate } from "@dataforged/json_out/index.js";
import type { SettingTruthId } from "@dataforged/json_out/setting_truths/SettingTruthName";

/**
 * A valid setting truth option ID.
 */
export type SettingTruthOptionId = `${SettingTruthId} / ${number}` | `${SettingTruthId} / ${number}-${number}`;

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see ISettingTruth
 */
export interface ISettingTruthOption extends Omit<IRow, "$id">, IHasQuestStarter, IHasDescription {
  $id: SettingTruthOptionId;
  "Roll template"?: RollTemplate<"Summary"|"Description"> | undefined;
}