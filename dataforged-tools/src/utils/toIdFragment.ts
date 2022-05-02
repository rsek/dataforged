/**
 * Formats a string for use in Dataforged string IDs.
 * @param str - The string to be converted.
 */
export function toIdFragment(str: string) {
  str = str.replaceAll(/[ /]/g, "_");
  str = str.replaceAll(/[':]/g, "");
  return str;
}
