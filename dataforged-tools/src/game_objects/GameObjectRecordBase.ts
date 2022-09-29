import type { AttributeKey, GameObjectType } from '@schema'
import type { AttributeMap } from '@utils'

/**
 * @public
 */
export type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey | undefined> = {
  object_type: T
  inherit_rolls?: boolean | undefined
  requirements?: K extends AttributeKey ? AttributeMap<K> : undefined
}
