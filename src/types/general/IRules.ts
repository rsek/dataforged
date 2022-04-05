import type IDisplay from "./IDisplay.js";
import type ISource from "./interfaces/ISource.js";
import type ISuggestions from "./interfaces/ISuggestions.js";
import type ISuggestionsYaml from "./interfaces/ISuggestionsYaml.js";
import type { FragmentString, ParagraphsString, SentenceString } from "./StringTypes.js";
import type RollTemplate from "../oracles/interfaces/IRollTemplate.js";

/**
 * Basic interface common to many rules objects. Really just a holding tank for common jsdoc descriptions.
 * @date 4/4/2022 - 10:44:43 PM
 *
 * @export
 * @interface IRules
 * @typedef {IRules}
 */
export default interface IRules {
  /**
   * The item's unique ID.
   * @date 4/4/2022 - 10:44:43 PM
   *
   * @type {?(string | undefined | null)}
   */
  $id?: string | undefined | null;
  /**
   * The item's name. Should be unique among its sibling elements, as it is used along with its ancestors to generate its $id.
   * @date 4/4/2022 - 10:44:43 PM
   *
   * @type {?string | undefined}
   */
  Name?: string | undefined;
  /**
   * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {?(string[] | undefined)}
   */
  Aliases?: string[] | undefined;
  /**
   * A markdown description to be presented to the user, consisting of one or more paragraphs..
   * @date 4/4/2022 - 10:44:43 PM
   *
   * @type {?(ParagraphsString | undefined)}
   */
  Description?: ParagraphsString | undefined;
  /**
   * Information on this item's source.
   * @date 4/4/2022 - 10:44:43 PM
   *
   * @type {?(ISource|undefined)}
   */
  Source?: ISource | undefined;
  /**
   * Data relevant to this item's display/rendering.
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {?(Partial<IDisplay> | undefined)}
   */
  Display?: Partial<IDisplay> | undefined;
  /**
   * The item's rules text as a markdown string.
   * @date 4/4/2022 - 11:03:54 PM
   *
   * @type {?(ParagraphsString | undefined)}
   */
  Text?: ParagraphsString | undefined;
    /**
   * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
   *
   * @type {?(ISuggestions | ISuggestionsYaml | undefined)}
   * @type {?(string | undefined)}
   */
  Suggestions?: ISuggestions | ISuggestionsYaml | undefined;
  /**
   * A markdown summary of the item.
   * @date 4/4/2022 - 11:14:21 PM
   *
   * @type {?(SentenceString | FragmentString  | undefined)}
   * @type {?(string | undefined)}
   */
  Summary?: SentenceString | FragmentString  | undefined;

  /**
   * Describes the MdString keys of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
   * @date 4/5/2022 - 1:20:19 PM
   *
   * @type {(RollTemplate<keyof IRules> | undefined)}
   */
  "Roll template"?: RollTemplate<keyof IRules & string> | undefined;
}