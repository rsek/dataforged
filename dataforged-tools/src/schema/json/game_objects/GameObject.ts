import type { GameObjectType } from '@game_objects'
import type { AttributeMap } from '@utils'
/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export interface GameObject {
  object_type: GameObjectType
  requires?: AttributeMap | undefined
}
