import type { AttributeKey, GameObjectType } from '@schema'
import type { AttributeMap } from '@utils'

/**
 * @public
 */
export type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
  'object_type': T
  'inherit_rolls'?: boolean | undefined
} & AttributeMap<K>
