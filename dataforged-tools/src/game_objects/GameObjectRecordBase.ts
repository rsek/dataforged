import type { GameObjectType } from '@schema'
import type { AttributeMap } from '@utils'

/**
 * @public
 */
export interface GameObjectRecordBase<T extends GameObjectType> {
  object_type: T
  inherit_rolls?: boolean | undefined
  requirements?: AttributeMap | undefined
}
