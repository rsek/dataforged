import type { Move } from '@schema'
import _ from 'lodash-es'

/**
 * It renders a move.
 * @param move - The move object to render.
 * @param headerLevel - The header level to use for the move.
 * @returns A string.
 */
export function renderMove (move: Move, headerLevel: number = 3): string {
  const header = _.repeat('#', headerLevel) + ' ' + move.Title.Canonical
  const items = [header]
  if (move['Progress move']) {
    items.push('*Progress Move*')
  }
  items.push(move.Text)
  return items.join('\n\n')
}
