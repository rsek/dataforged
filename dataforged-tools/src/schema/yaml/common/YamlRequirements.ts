import type { AttributeKey } from '@schema'
import type { AttributeMap } from '@utils/types/AttributeHash.js'

/**
 * @internal
 */
export interface YamlRequirements<K extends AttributeKey = AttributeKey> {
  attributes: AttributeMap<K>
}
