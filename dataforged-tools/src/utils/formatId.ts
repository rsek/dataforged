import _ from 'lodash-es'

/**
 * @internal
 */
export const ID_JOINER = '/'

/**
 * Formats a series of ID string fragments for use as a Dataforged string ID.
 * @internal
 */
export function formatId (parentId: string, ...newFragments: string[]): string {
  return [parentId, ...newFragments.map(fragment => _.snakeCase(fragment).replace(/_s_/gim, "s_"))].join(ID_JOINER)
}
