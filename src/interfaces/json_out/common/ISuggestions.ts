import type { IGameObject } from "@dataforged/interfaces/json_out/common/IGameObject.js";
import type { AssetId } from "@dataforged/strings/id/AssetId.js";
import type { EncounterId } from "@dataforged/strings/id/EncounterId.js";
import type { MoveId } from "@dataforged/strings/id/MoveId.js";
import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";

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
