import type { EncounterId } from "@dataforged/interfaces/json_out/encounters/strings/EncounterId.js";
import type { AssetId, IGameObject, OracleTableId } from "@dataforged/interfaces/json_out/index.js";
import type { MoveId } from "@dataforged/interfaces/json_out/moves/strings/MoveId.js";

/**
 * Interface representing "non-canon" suggestions for related game content.
 *
 */
export interface ISuggestions  {
  /**
   * Suggested game objects and their parameters.
   */
  "Game objects"?: IGameObject[] | undefined;
  /**
   * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   * Suggested move IDs.
   */
  "Moves"?: MoveId[] | undefined;
  /**
   * Suggested asset IDs.
   */
  "Assets"?: AssetId[] | undefined;
  /**
   * Suggested encounter IDs.
   */
  "Encounters"?: EncounterId[] | undefined;
}
