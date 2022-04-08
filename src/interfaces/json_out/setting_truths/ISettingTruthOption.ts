import type { SettingTruthId } from "@dataforged/classes/setting_truths/SettingTruth.js";
import type { IHasDescription, IHasQuestStarter } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { RollTemplate } from "@dataforged/interfaces/json_out/oracles/IRollTemplate.js";
import type { IRow } from "@dataforged/interfaces/json_out/oracles/IRow.js";

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