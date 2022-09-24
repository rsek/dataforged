import type { GameObjectType } from "@game_objects";
import type { Requirements } from "@schema_json";
/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export interface GameObject {
  "Object type": GameObjectType;
  Requires?: Requirements | undefined;
}
