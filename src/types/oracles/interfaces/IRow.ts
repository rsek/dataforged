import type IMultipleRolls from "./IMultipleRolls.js";
import type RollTemplate from "./IRollTemplate.js";
import type { IRowRollYaml } from "./yaml/IRowYaml.js";
import type IAttributeChoices from "../../gameObjects/IAttributeChoices.js";
import type IGameObject from "../../gameObjects/IGameObject.js";
import type IDisplay from "../../general/IDisplay.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";
import type IRules from "../../general/IRules.js";
import type { FragmentString, ParagraphsString, SentenceString, TermString } from "../../general/StringTypes.js";
import type { SettingTruthOptionId } from "../../truths/ISettingTruthOption.js";
import type OracleContent from "../classes/OracleContent.js";
import type Row from "../classes/Row.js";
import type OracleTableId from "../OracleTableId.js";
import type OracleTableRowId from "../OracleTableRowId.js";

/**
 * Display properties for a single row in an oracle table.
 * @date 4/5/2022 - 12:41:53 AM
 *
 * @export
 * @typedef {IRowDisplay}
 */
export type IRowDisplay = Omit<IDisplay, "Title">;

/**
 * Interface representing a single row in an oracle table.
 * @date 4/5/2022 - 12:41:53 AM
 *
 * @export
 * @interface IRow
 * @typedef {IRow}
 * @extends {IRules}
 */
export default interface IRow extends IRules {
  /**
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(SettingTruthOptionId | OracleTableRowId | undefined | null)}
   */
  $id?: SettingTruthOptionId | OracleTableRowId | undefined | null;
  /**
   * The low end of the dice range for this row.
   * @date 4/5/2022 - 12:41:53 AM
   * @min 1
   * @max 100
   * @type {number|null}
   */
  Floor: IRowRollYaml[0];
  /**
   * The high end of the dice range for this row.
   * @date 4/5/2022 - 12:41:53 AM
   * @min 1
   * @max 100
   * @type {number|null}
   */
  Ceiling: IRowRollYaml[1];
  /**
   * The primary result text for the row, annotated in Markdown.
   *
   * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
   *
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {(TermString | FragmentString | SentenceString)}
   */
  Result: TermString | FragmentString | SentenceString;
  /**
   * A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).
   *
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(SentenceString | FragmentString | undefined)}
   */
  Summary?: SentenceString | FragmentString | undefined;
  /**
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(ParagraphsString | undefined)}
   */
  Description?: ParagraphsString | undefined;
  /**
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(IRowDisplay | undefined)}
   */
  Display?: IRowDisplay | undefined;
  /**
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(OracleContent | undefined)}
   */
  Content?: OracleContent | undefined;
  /**
   * Additional oracle tables that should be rolled when this row is selected.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(IRow[] | undefined)}
   */
  Subtable?: IRow[] | undefined;
  /**
   * Any game objects that are explicitly pointed to by the original text. It is *not* recommended to generate them automatically - see "Peeling the Onion", p. XX.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(IGameObject[] | undefined)}
   */
  "Game objects"?: IGameObject[] | undefined;
  /**
   * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(IMultipleRolls | undefined)}
   */
  "Multiple rolls"?: IMultipleRolls | undefined;
  /**
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(ISuggestions | undefined)}
   */
  Suggestions?: ISuggestions | undefined;
  /**
  * The attributes set by this row.
   * @date 4/5/2022 - 12:41:53 AM
   *
   * @type {?(IAttributeChoices[] | undefined)}
   */
  Attributes?: IAttributeChoices[] | undefined;

  /**
   *
   * @date 4/5/2022 - 1:49:15 PM
   *
   * @type {?(RollTemplate<"Result"|"Summary">|undefined)}
   */
  "Roll templates"?: RollTemplate<"Result"|"Summary"> | undefined;
}