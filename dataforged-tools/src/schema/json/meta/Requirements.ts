import type { AttributeChoices, AttributeMaster } from '@schema'
import { AttributeKey } from '@schema'

/**
 * Data describing an item's requirements: attribute keys, and values of those keys that satisfy the requirements.
 * @public
 */
export type Requirements<TK extends AttributeKey = AttributeKey> = Record<TK, Array<AttributeMaster[TK]>>
