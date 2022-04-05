import type ISuggestionsYaml from "./ISuggestionsYaml.js";
import type AssetId from "../../assets/AssetId.js";
import type EncounterId from "../../encounters/EncounterId.js";
import type IGameObject from "../../gameObjects/IGameObject.js";
import type MoveId from "../../moves/MoveId.js";
import type OracleTableId from "../../oracles/OracleTableId.js";

/**
 * Object representing "non-canon" suggestions for related game content.
 * @date 4/4/2022 - 10:02:06 PM
 *
 * @export
 * @interface ISuggestions
 * @typedef {ISuggestions}
 * @extends {Omit<ISuggestionsYaml, "Game objects">}
 */
export default interface ISuggestions extends Omit<ISuggestionsYaml, "Game objects"> {
  /**
   * Suggested game objects and their parameters.
   * @date 4/4/2022 - 10:02:06 PM
   *
   * @type {?(IGameObject[] | undefined)}
   */
  "Game objects"?: IGameObject[] | undefined;
  /**
   * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
   * @date 4/4/2022 - 10:02:06 PM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   * Suggested move IDs.
   * @date 4/4/2022 - 10:02:06 PM
   *
   * @type {?(MoveId[] | undefined)}
   */
  "Moves"?: MoveId[] | undefined;
  /**
   * Suggested asset IDs.
   * @date 4/4/2022 - 10:02:06 PM
   *
   * @type {?(AssetId[] | undefined)}
   */
  "Assets"?: AssetId[] | undefined;
  /**
   * Suggested encounter IDs.
   * @date 4/4/2022 - 10:02:06 PM
   *
   * @type {?(EncounterId[] | undefined)}
   */
  "Encounters"?: EncounterId[] | undefined;
}
