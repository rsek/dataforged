import type { IAsset, IEncounter , IGameObject, IMove , IOracle } from "@json_out/index.js";

/**
 * Describes "non-canonical" suggestions for game content related to the parent item.
 *
 * These are intended be offered as convenient shortcuts for the user (for instance, including a menu dropdown for rolling on suggested tables); having them roll automatically is **not recommended** for most projects.
 *
 * These can be safely ignored if that functionality is not desired.
 */
export interface ISuggestions  {
  /**
   * Suggested game objects and their parameters.
   */
  "Game objects"?: IGameObject[] | undefined;
  /**
   * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
   */
  "Oracle rolls"?: IOracle["$id"][] | undefined;
  /**
   * Suggested move IDs.
   */
  "Moves"?: IMove["$id"][] | undefined;
  /**
   * Suggested asset IDs.
   */
  "Assets"?: IAsset["$id"][] | undefined;
  /**
   * Suggested encounter IDs.
   */
  "Encounters"?: IEncounter["$id"][] | undefined;
}
