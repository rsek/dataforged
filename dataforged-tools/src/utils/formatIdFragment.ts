/**
 * Formats a string for use in Dataforged string IDs.
 * @param str - The string to be converted.
 */
export function formatIdFragment(str: string) {
  if (!str) {
    new Error("ID fragment is undefined!")
  }
  str = str.replaceAll(/[ /]/g, "_");
  str = str.replaceAll(/[':()]/g, "");
  return str;
}
