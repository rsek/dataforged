import type { IHasDescription, IHasQuestStarter , IRow , RollTemplate } from "@json_out/index.js";
import type { IHasSummary } from "@json_out/meta/IHas.js";
import type { SettingTruthOptionId } from "@json_out/setting_truths/SettingTruthOptionId.js";

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 */
export interface ISettingTruthOption extends Omit<IRow, "$id"|"Summary">, IHasQuestStarter, IHasDescription {
  $id: SettingTruthOptionId;
  "Roll template"?: RollTemplate<"Summary"|"Description"> | undefined;
}