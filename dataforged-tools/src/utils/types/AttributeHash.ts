import type { AttributeKey, AttributeMaster } from '@schema'
/**
 * @public
 */
export type AttributeMap<K extends AttributeKey = AttributeKey> = {
  [key in K]?: Array<AttributeMaster[K]> | undefined | null
}
