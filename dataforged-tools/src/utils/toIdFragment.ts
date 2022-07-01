//License: MIT
export function formatIdFragment(str: string) {
  str = str.replaceAll(/[ /]/g, "_");
  str = str.replaceAll(/[':()]/g, "");
  return str;
}
