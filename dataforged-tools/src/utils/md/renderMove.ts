import type { Move } from '@schema'
import _ from 'lodash'

/**
 * It renders a move.
 * @param move - The move object to render.
 * @param headerLevel - The header level to use for the move.
 * @returns A string.
 */
export function renderMove (move: Move, headerLevel: number = 3): string {
  const header = _.repeat('#', headerLevel) + ' ' + move.title.canonical
  const items = [header]
  if (move.progress_move) {
    items.push('*Progress Move*')
  }
  items.push(move.text)
  return items.join('\n\n')
}
