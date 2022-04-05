import type ISettingTruthOption from "./ISettingTruthOption.js";
import type { SettingTruthId, SettingTruthName } from "./SettingTruth.js";
import type ISource from "../general/interfaces/ISource.js";
import type ISuggestionsYaml from "../general/interfaces/ISuggestionsYaml.js";
import type IRules from "../general/IRules.js";
import type { ParagraphsString } from "../general/StringTypes.js";

export default interface ISettingTruth extends IRules {
  /**
   *
   * @type {SettingTruthId}
   * @memberof ISettingTruth
   */
  $id: SettingTruthId;
  /**
   *
   * @type {SettingTruthName}
   * @memberof ISettingTruth
   */
  Name: SettingTruthName;
  /**
   * The 'canonical' options for this setting truth category.
   *
   * @type {ISettingTruthOption[]}
   * @memberof ISettingTruth
   */
  Table: ISettingTruthOption[];
  /**
   * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
   *
   * @type {ParagraphsString}
   * @memberof ISettingTruth
   */
  Character: ParagraphsString;
  /**
   *
   * @type {(ISuggestionsYaml | undefined)}
   * @memberof ISettingTruth
   */
  Suggestions?: ISuggestionsYaml | undefined;
  Source: ISource;
}
