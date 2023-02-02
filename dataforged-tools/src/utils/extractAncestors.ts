import type { MixinId } from '@schema'
import { inRange } from 'lodash'

/**
 * Infers the ancestor IDs of a Dataforged ID.
 * @param id - The ID to extract ancestor IDs from.
 */
export function extractAncestors (id: MixinId['$id']): Array<MixinId['$id']> {
  const fragments = id.split('/')
  const ancestors: string[] = []

  fragments.forEach((_, index) => {
    if (inRange(index, 2, fragments.length - 1)) {
      ancestors.push(fragments.slice(0, index + 1).join('/'))
      //
    }
  }
  )
  return ancestors
}
