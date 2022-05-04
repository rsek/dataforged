/**
 * Formats a string for use in Dataforged string IDs.
 * @param str - The string to be converted.
 */
export function formatIdFragment(str: string) {
  str = str.replaceAll(/[ /]/g, "_");
  str = str.replaceAll(/[':()]/g, "");
  return str;
}
