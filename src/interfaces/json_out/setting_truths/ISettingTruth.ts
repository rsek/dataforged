import type { SettingTruthId, SettingTruthName } from "@dataforged/classes/setting_truths/SettingTruth.js";
import type { IHasId, IHasName, IHasSource, IHasSuggestions, IHasTable } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { ISuggestions } from "@dataforged/interfaces/json_out/common/ISuggestions.js";
import type { ISettingTruthOption } from "@dataforged/interfaces/json_out/setting_truths/ISettingTruthOption.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

export interface ISettingTruth extends IHasId<SettingTruthId>, IHasName<SettingTruthName>, IHasSource, Partial<IHasSuggestions<ISuggestions>>, IHasTable<ISettingTruthOption> {
  /**
   * The 'canonical' options for this setting truth category.
   */
  Table: ISettingTruthOption[];
  /**
   * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
   */
  Character: ParagraphsString;
}
