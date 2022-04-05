import type IMoveOutcomes from "./IMoveOutcomes.js";
import type IMoveTriggerYaml from "./IMoveTriggerYaml.js";
import type AssetId from "../../assets/AssetId.js";
import type IDisplay from "../../general/IDisplay.js";
import type ISource from "../../general/interfaces/ISource.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";
import type { ParagraphsString } from "../../general/StringTypes.js";
import type OracleTableId from "../../oracles/OracleTableId.js";
import type MoveCategoryId from "../MoveCategoryId.js";
import type MoveId from "../MoveId.js";

/**
 * Interface representing a Starforged move.
 * @date 4/4/2022 - 10:07:06 PM
 *
 * @export
 * @interface IMove
 * @typedef {IMove}
 */
export default interface IMove {
  /**
   * The Move's unique ID.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(MoveId | undefined)}
   */
  $id?: MoveId | undefined;
  /**
   * The move's standard name, used to generate its ID.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {string}
   */
  Name: string;
  /**
   * The ID of the parent Asset of the move, if any.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(AssetId | undefined)}
   */
  Asset?:  AssetId | undefined;
  /**
   * The ID of the move's category.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {MoveCategoryId}
   */
  Category: MoveCategoryId;
  /**
   * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(boolean | undefined)}
   */
  "Progress Move"?: boolean | undefined;
  /**
   * The ID of the move that this move is a variant of, if any.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(MoveId | undefined)}
   */
  "Variant of"?: MoveId | undefined;
  /**
   * The move's trigger data.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {IMoveTriggerYaml}
   */
  Trigger: IMoveTriggerYaml;
  /**
   * The rules text of the move in Markdown.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {ParagraphsString}
   */
  Text: ParagraphsString;
  /**
   * Parameters for rendering the move.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {IDisplay}
   */
  Display: IDisplay;
  /**
   * The IDs of any oracles *directly* referenced by the move.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  Oracles?: OracleTableId[] | undefined;
  /**
   * Source data for the move.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(ISource | undefined)}
   */
  Source?: ISource | undefined;
  /**
   * Suggestions for the move.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(ISuggestions | undefined)}
   */
  Suggestions?: ISuggestions | undefined;
  /**
   * Outcome information for the move.
   * @date 4/4/2022 - 10:07:06 PM
   *
   * @type {?(IMoveOutcomes | undefined)}
   */
  Outcomes?: IMoveOutcomes | undefined;
}
