
/**
 * Formats a string for use in Dataforged string IDs.
 * @param str - The string to be converted.
 * @internal
 */
function formatIdFragment(str: string) {
  if (!str) {
    new Error("ID fragment is undefined!")
  }
  str = str.replaceAll(/[ /]/g, "_");
  str = str.replaceAll(/[':()]/g, "");
  return str;
}
/**
 * @internal
 */
export const ID_JOINER = "/"

/**
 * Formats a series of ID string fragments for use as a Dataforged string ID.
 * @param currentFragment - The fragment representing the current item.
 * @param ancestorFragments - The fragments -- ordered from left to right -- representing the ancestor(s) of the item. These should already be formatted.
 * @internal
 */
export function formatId(currentFragment: string, ...ancestorFragments: string[]): string {

  return [...ancestorFragments, formatIdFragment(currentFragment)].join(ID_JOINER).toLowerCase()
}