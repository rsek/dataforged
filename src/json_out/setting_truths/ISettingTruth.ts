import type { IHasId, IHasName, IHasSource, IHasSuggestions, IHasTable , ISettingTruthOption , ISuggestions , ParagraphsString } from "@json_out/index.js";
import type { SettingTruthId, SettingTruthName } from "@json_out/setting_truths/SettingTruthName";
/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 */
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
