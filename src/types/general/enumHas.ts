import type EnumLike from "./EnumLike";

/**
 * Check if an enum has a specific value. Useful mainly in situations where typescript-is shouldn't be invoked, for example while debugging via ts-node or ttypescript.
 * @param {T} e - The enum object
 * @param {string} str - The string to search for.
 * @returns True if the value is included. False if not.
 */
export default function enumHas<T extends EnumLike>(e: T, str: string) {
  return Object.values(e).includes(str);
}


